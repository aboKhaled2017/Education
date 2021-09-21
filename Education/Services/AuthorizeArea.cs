using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Education.Services
{
    public class AuthorizeArea: IAuthorizationRequirement
    {
    }
    public class auth : AuthorizationHandler<AuthorizeArea>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AuthorizeArea requirement)
        {
            throw new NotImplementedException();
        }
    }
}
