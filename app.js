$(document).ready(function() {
    function toggleScrollTopBtn() {
        if ($(this).scrollTop() > 200) {
            $('#scrollTopBtn').fadeIn();
        } else {
            $('#scrollTopBtn').fadeOut();
        }
    }

    $(window).scroll(toggleScrollTopBtn);

    $('#scrollTopBtn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    function filterProjects(inputId, suggestionsId, itemsClass, suggestions) {
        $(inputId).on('focus keyup', function() {
            const filter = $(this).val().toLowerCase();
            const filteredSuggestions = suggestions.filter(category =>
                category.toLowerCase().includes(filter)
            );

            $(suggestionsId).empty().toggle(filteredSuggestions.length > 0);
            filteredSuggestions.forEach(category =>
                $(suggestionsId).append(
                    `<a href="#" class="list-group-item">${category}</a>`
                )
            );

            $(itemsClass).each(function() {
                $(this).toggle(
                    $(this).data('category').toLowerCase().includes(filter)
                );
            });
        });

        $(document).on('click', `${suggestionsId} .list-group-item`, function(e) {
            e.preventDefault();
            const selectedCategory = $(this).text();
            $(inputId).val(selectedCategory).trigger('keyup');
            $(suggestionsId).hide();
        });
    }

    filterProjects('#categoryFilterPortfolio', '#portfolioSuggestions', '.project', [
        'Web App', 'Game'
    ]);

    filterProjects('#categoryFilterBlog', '#blogSuggestions', '.post', [
        'Backend', 'Mensageria'
    ]);
});