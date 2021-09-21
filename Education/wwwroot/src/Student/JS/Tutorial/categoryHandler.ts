export let categoryHandler = {
    mainCategoryPattern: '/tutorial/([0-9]{1,3})/([a-zA-Z ]{3,}|[\u0600-\u06FF ]{3,})',
    subCategoryPattern: String.raw`/tutorial/([0-9]{1,3})/([a-zA-Z ]{3,}|[\u0600-\u06FF ]{3,})/([a-zA-Z ]{3,}|[\u0600-\u06FF ]{3,})`,
    subjectPattern: String.raw`/tutorial/([0-9]{1,3})/([a-zA-Z ]{3,}|[\u0600-\u06FF ]{3,})/([a-zA-Z ]{3,}|[\u0600-\u06FF ]{3,})/([a-zA-Z0-9]{8}-([a-zA-Z0-9]{4}-){3}[a-zA-Z0-9]{12})/([a-zA-Z ]{3,}|[\u0600-\u06FF ]{3,})`,
    handleUrlOperations() {
        let url = decodeURIComponent(location.href);
        const mainCategoryResult = new RegExp(this.mainCategoryPattern, "i").exec(url);
        const subCategoryResult = new RegExp(this.subCategoryPattern, "i").exec(url);
        const subjectResult = new RegExp(this.subjectPattern, "i").exec(url);
        let matchedResult = subjectResult || subCategoryResult || mainCategoryResult || {} as RegExpExecArray;
        if (matchedResult.length == 3) this.handleMainCategoryRequest(matchedResult);
        else if (matchedResult.length == 4) this.handleSubcategoryRequest(matchedResult);
        else if (matchedResult.length>4) this.handleSubjectRequest(matchedResult);
        else return;
    },
    handleMainCategoryRequest(result: RegExpExecArray) {
        var [, id, categoryName] = result;
        let selectedCatEl = $(`.tracks-wrapper li>a[data-id="${id}"]:eq(0)`);
        selectedCatEl.parent().addClass('active');
    },
    handleSubcategoryRequest(result: RegExpExecArray) {
        var [, id, mainCategoryName, subCategoryName] = result;
        let mainCategoryId = $(`.tracks-wrapper li>a[data-id="${id}"]:eq(0)`).parents('ul').data('parentid');
        let selectedCatEl = $(`.tracks-wrapper li>a[data-id="${mainCategoryId}"]:eq(0)`);
        console.log(selectedCatEl);
        let newElement = $(String.raw`
            <ul class="subCategories">
                <li class="subCategory">
                    ${mainCategoryName}
                </li>
                <li class="subCategory active">
                    ${subCategoryName}
                </li>
            </ul>            
        `);
        selectedCatEl.text('').append(newElement);
        selectedCatEl.parent().addClass('superCategory');
    },
    handleSubjectRequest(result: RegExpExecArray) {
        var [, id, mainCategoryName, subCategoryName, subjId,, subjName] = result;
        let mainCategoryId = $(`.tracks-wrapper li>a[data-id="${id}"]:eq(0)`).parents('ul').data('parentid');
        let selectedCatEl = $(`.tracks-wrapper li>a[data-id="${mainCategoryId}"]:eq(0)`);
        console.log(selectedCatEl);
        let newElement = $(String.raw`
            <ul class="subCategories">
                <li class="subCategory">
                    ${mainCategoryName}
                </li>
                <li class="subCategory">
                    ${subCategoryName}
                </li>
                <li class="subCategory active">
                    ${subjName}
                </li>
            </ul>            
        `);
        selectedCatEl.text('').append(newElement);
        selectedCatEl.parent().addClass('superCategory');
    },
    startHandle() {
        this.handleUrlOperations();

    }
}