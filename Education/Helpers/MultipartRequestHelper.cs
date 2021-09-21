using System;
using System.IO;
using Microsoft.Net.Http.Headers;

namespace Education
{
    public static class MultipartRequestHelper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="contentType">multipart/form-data;boundary="---webkitFormBoundaryxehdgwif"</param>
        /// <param name="lengthLimit">the spc says70 charcters is reasnable limit</param>
        /// <returns></returns>
        public static string GetBoundary(MediaTypeHeaderValue contentType, int lengthLimit)
        {
            var boundary = Microsoft.Net.Http.Headers.HeaderUtilities.RemoveQuotes(contentType.Boundary).Value;
            if (string.IsNullOrWhiteSpace(boundary))
            {
                throw new InvalidDataException("missing content-type boundary");
            }
            if (boundary.Length > lengthLimit)
            {
                throw new InvalidDataException($"multipart boundary length limit {lengthLimit} exceeded");
            }
            return boundary;
        }
        public static bool IsMultipartContentType(string contenttype)
        {
            return !string.IsNullOrEmpty(contenttype)
            && contenttype.IndexOf("multipart/", StringComparison.OrdinalIgnoreCase) >= 0;
        }
        public static bool HasFormdataContentDisposition(ContentDispositionHeaderValue contentDisposition)
        {
            return contentDisposition != null
            && contentDisposition.DispositionType.Equals("form-data")
            && string.IsNullOrEmpty(contentDisposition.FileName.Value)
            && string.IsNullOrEmpty(contentDisposition.FileNameStar.Value);
        }
        public static bool HasFileContentDisposition(ContentDispositionHeaderValue contentDisposition)
        {
            return contentDisposition != null
            && contentDisposition.DispositionType.Equals("form-data")
            && (!string.IsNullOrEmpty(contentDisposition.FileName.Value) ||
             !string.IsNullOrEmpty(contentDisposition.FileNameStar.Value));

        }
    }
}
