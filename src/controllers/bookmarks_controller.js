EPUBJS.reader.BookmarksController = function() {
	var reader = this;
	var book = this.book;
	var rendition = this.rendition;

	var $bookmarks = $("#bookmarksView"),
			$list = $bookmarks.find("#bookmarks");

	var docfrag = document.createDocumentFragment();

	var show = function() {
		$bookmarks.show();
	};

	var hide = function() {
		$bookmarks.hide();
	};

	var counter = 0;

	var createBookmarkItem = function(cfi) {
		var listitem = document.createElement("li"),
				link = document.createElement("a");

		listitem.id = "bookmark-"+counter;
		listitem.classList.add('list_item');

		var spineItem = book.spine.get(cfi);
		var tocItem;
		if (spineItem.index in book.navigation.toc) {
			tocItem = book.navigation.toc[spineItem.index];
			link.textContent = tocItem.label;
		} else {
			link.textContent = cfi;
		}

		link.href = cfi;

		link.classList.add('bookmark_link');

		link.addEventListener("click", function(event){
				var cfi = this.getAttribute('href');
				rendition.display(cfi);
				event.preventDefault();
		}, false);

		listitem.appendChild(link);

		counter++;

		return listitem;
	};

	this.settings.bookmarks.forEach(function(cfi) {
		var bookmark = createBookmarkItem(cfi);
		docfrag.appendChild(bookmark);
	});

	$list.append(docfrag);

	this.on("reader:bookmarked", function(cfi) {
		var item = createBookmarkItem(cfi);
		$list.append(item);
	});

	this.on("reader:unbookmarked", function(index) {
		var $item = $("#bookmark-"+index);
		$item.remove();
	});

	return {
		"show" : show,
		"hide" : hide
	};
};
