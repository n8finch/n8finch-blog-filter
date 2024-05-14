/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);



const PostItem = ({
  post
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "postItem-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "image-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: post.uri
  }, post.featuredImage && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: post.featuredImage,
    alt: post.title
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "content-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: post.uri
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, post.title)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("em", null, "Published:", " ", new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: post.excerpt.slice(0, 100) + "..."
    }
  })));
};
const PostList = ({
  posts
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, posts.map(post => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(PostItem, {
    key: post.id,
    post: post
  })));
};
const SearchForm = ({
  search,
  setSearch
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: "search",
    placeholder: "Search posts...",
    value: search,
    onChange: event => setSearch(event.target.value)
  }));
};
const graphqlEndpoint = "https://n8finch2024.local/graphql";
const query = `
{
  posts(first: 500) {
    nodes {
      id
      title
      excerpt
      date
      uri
      featuredImage {
        node {
          sourceUrl(size: MEDIUM)
        }
      }
    }
  }
}
`;
const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query
  })
};
function BlogFilterApp() {
  const [posts, setPosts] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [search, setSearch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    console.log("Hello from JavaScript!");
    fetch(graphqlEndpoint, requestOptions).then(response => response.json()).then(data => {
      const fetchedPosts = data.data.posts.nodes;
      const posts = fetchedPosts.map(post => {
        return {
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          date: post.date,
          uri: post.uri,
          featuredImage: post.featuredImage ? post.featuredImage.node.sourceUrl : null
        };
      });
      setPosts(posts);
      setLoading(false);
    }).catch(error => console.error("Error fetching posts:", error));
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SearchForm, {
    search: search,
    setSearch: setSearch
  }), loading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("em", null, "Loading posts...")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(PostList, {
    posts: posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
  }));
}
const root = (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createRoot)(document.getElementById("n8finch-blog-filter"));
window.addEventListener("load", function () {
  root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlogFilterApp, null));
}, false);
})();

/******/ })()
;
//# sourceMappingURL=view.js.map