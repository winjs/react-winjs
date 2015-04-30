// Notes
// - What's the most common way to distribute React components? webpack? requirejs?
// - React appears to restore focus after componentWillReceiveProps. This is problematic for
//   overlays like Flyout that are synchronously shown and take focus in componentWillReceiveProps.
//   Maybe treat props such as hidden/opened as special and set them outside of React component
//   lifecycle so that focus movements work properly.
// - propTypes
// - Should React be listed as a peerDependency instead of as a dependency?
// - Does this project need a webpack config file?
// - Enable setting of classNames and inline styles on control roots?
// - Which props need to work like controlled components?
// - What if we modeled dismissables like this? Instead of the app having to call hide/show,
//   the app could render a special element for all dismissables (e.g. Dismissables) and when
//   a dismissable is rendered into there, it will be shown. When it is no longer rendered
//   in there, it will be hidden and removed from the DOM when its hide animation completes.
//   This only makes sense for things that hide/show not for things that close/open because
//   the latter need to be rendered even they're closed. Example:
//     <Dismissables>
//       <Flyout key="myFlyout">
//         This is a Flyout!
//       </Flyout>
//       <ContentDialog key="myDialog">
//         This is a ContentDialog!
//       </ContentDialog>
//     </Dismissables>
// - Adaptive apps. In adaptive apps, you want to render certain components at some screen
//   sizes but not at others. For cheap WinJS controls, reinstantiating the control during
//   resize when it is needed may be fine. However, this pattern may not work well for
//   expensive controls like the ListView. We'd want more of a lazy init pattern:
//     - If the control isn't needed at this screen size, don't render it.
//     - When the control is needed, instatiate it.
//     - When the control isn't needed anymore, hide it (display: none).
//     - When the control is needed again, show it (display: block) and call forceLayout()
//   react-winjs could add a special prop to handle all of the details of this pattern for
//   you with a special prop (e.g. displayNone). It could look like this:
//     <ListView
//       displayNone={this.state.shouldHideListViewAtThisScreenSize}
//       itemDataSource={this.state.itemDataSource}
//       itemTemplate={this.itemTemplate} />
// - Provide SplitViewButton & SplitViewCommand components or wait for WinJS to provide
//   the corresponding controls?

var React = require('react/addons');

var ReactWinJS = {};

// Generated from https://github.com/rigdern/winjs-control-apis
var RawControlApis = {
    AppBar: [
        "closedDisplayMode",
        "commands",
        "disabled",
        "element",
        "hidden",
        "layout",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "placement",
        "sticky"
    ],
    AppBarCommand: [
        "disabled",
        "element",
        "extraClass",
        "firstElementFocus",
        "flyout",
        "hidden",
        "icon",
        "id",
        "label",
        "lastElementFocus",
        "onClick",
        "section",
        "selected",
        "tooltip",
        "type"
    ],
    AutoSuggestBox: [
        "chooseSuggestionOnEnter",
        "disabled",
        "element",
        "onQueryChanged",
        "onQuerySubmitted",
        "onResultSuggestionsChosen",
        "onSuggestionsRequested",
        "placeholderText",
        "queryText",
        "searchHistoryContext",
        "searchHistoryDisabled"
    ],
    BackButton: [
        "element"
    ],
    CellSpanningLayout: [
        "groupHeaderPosition",
        "groupInfo",
        "itemInfo",
        "maximumRowsOrColumns",
        "numberOfItemsPerItemsBlock",
        "orientation"
    ],
    Command: [
        "disabled",
        "element",
        "extraClass",
        "firstElementFocus",
        "flyout",
        "hidden",
        "icon",
        "id",
        "label",
        "lastElementFocus",
        "onClick",
        "section",
        "selected",
        "tooltip",
        "type"
    ],
    ContentDialog: [
        "element",
        "hidden",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "primaryCommandDisabled",
        "primaryCommandText",
        "secondaryCommandDisabled",
        "secondaryCommandText",
        "title"
    ],
    DatePicker: [
        "calendar",
        "current",
        "datePattern",
        "disabled",
        "element",
        "maxYear",
        "minYear",
        "monthPattern",
        "onChange",
        "yearPattern"
    ],
    FlipView: [
        "currentPage",
        "element",
        "itemDataSource",
        "itemSpacing",
        "itemTemplate",
        "onDataSourceCountChanged",
        "onPageCompleted",
        "onPageSelected",
        "onPageVisibilityChanged",
        "orientation"
    ],
    Flyout: [
        "alignment",
        "anchor",
        "element",
        "hidden",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "placement"
    ],
    GridLayout: [
        "backdropColor",
        "disableBackdrop",
        "groupHeaderPosition",
        "groupInfo",
        "horizontal",
        "itemInfo",
        "maxRows",
        "maximumRowsOrColumns",
        "numberOfItemsPerItemsBlock",
        "orientation"
    ],
    Hub: [
        "element",
        "headerTemplate",
        "indexOfFirstVisible",
        "indexOfLastVisible",
        "loadingState",
        "onContentAnimating",
        "onHeaderInvoked",
        "onLoadingStateChanged",
        "orientation",
        "scrollPosition",
        "sectionOnScreen",
        "sections",
        "zoomableView"
    ],
    HubSection: [
        "contentElement",
        "element",
        "header",
        "isHeaderStatic"
    ],
    ItemContainer: [
        "draggable",
        "element",
        "onInvoked",
        "onSelectionChanged",
        "onSelectionChanging",
        "selected",
        "selectionDisabled",
        "swipeBehavior",
        "swipeOrientation",
        "tapBehavior"
    ],
    ListLayout: [
        "backdropColor",
        "disableBackdrop",
        "groupHeaderPosition",
        "groupInfo",
        "horizontal",
        "itemInfo",
        "numberOfItemsPerItemsBlock",
        "orientation"
    ],
    ListView: [
        "automaticallyLoadPages",
        "currentItem",
        "element",
        "footer",
        "groupDataSource",
        "groupHeaderTapBehavior",
        "groupHeaderTemplate",
        "header",
        "indexOfFirstVisible",
        "indexOfLastVisible",
        "itemDataSource",
        "itemTemplate",
        "itemsDraggable",
        "itemsReorderable",
        "layout",
        "loadingBehavior",
        "loadingState",
        "maxDeferredItemCleanup",
        "onContentAnimating",
        "onGroupHeaderInvoked",
        "onItemDragBetween",
        "onItemDragChanged",
        "onItemDragDrop",
        "onItemDragEnd",
        "onItemDragEnter",
        "onItemDragLeave",
        "onItemDragStart",
        "onItemInvoked",
        "onKeyboardNavigating",
        "onLoadingStateChanged",
        "onSelectionChanged",
        "onSelectionChanging",
        "pagesToLoad",
        "pagesToLoadThreshold",
        "scrollPosition",
        "selection",
        "selectionMode",
        "swipeBehavior",
        "tapBehavior",
        "zoomableView"
    ],
    Menu: [
        "alignment",
        "anchor",
        "commands",
        "element",
        "hidden",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "placement"
    ],
    MenuCommand: [
        "disabled",
        "element",
        "extraClass",
        "flyout",
        "hidden",
        "id",
        "label",
        "onClick",
        "selected",
        "type"
    ],
    NavBar: [
        "commands",
        "disabled",
        "element",
        "hidden",
        "layout",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "onChildrenProcessed",
        "placement",
        "sticky"
    ],
    NavBarCommand: [
        "element",
        "icon",
        "label",
        "location",
        "splitButton",
        "splitOpened",
        "state",
        "tooltip"
    ],
    NavBarContainer: [
        "currentIndex",
        "data",
        "element",
        "fixedSize",
        "layout",
        "maxRows",
        "onInvoked",
        "onSplitToggle",
        "template"
    ],
    Pivot: [
        "element",
        "items",
        "locked",
        "onItemAnimationEnd",
        "onItemAnimationStart",
        "onSelectionChanged",
        "selectedIndex",
        "selectedItem",
        "title"
    ],
    PivotItem: [
        "contentElement",
        "element",
        "header"
    ],
    Rating: [
        "averageRating",
        "disabled",
        "element",
        "enableClear",
        "maxRating",
        "onCancel",
        "onChange",
        "onPreviewChange",
        "tooltipStrings",
        "userRating"
    ],
    SearchBox: [
        "chooseSuggestionOnEnter",
        "disabled",
        "element",
        "focusOnKeyboardInput",
        "onQueryChanged",
        "onQuerySubmitted",
        "onReceivingFocusOnKeyboardInput",
        "onResultSuggestionsChosen",
        "onSuggestionsRequested",
        "placeholderText",
        "queryText",
        "searchHistoryContext",
        "searchHistoryDisabled"
    ],
    SemanticZoom: [
        "element",
        "enableButton",
        "isDeclarativeControlContainer",
        "locked",
        "onZoomChanged",
        "zoomFactor",
        "zoomedOut"
    ],
    SplitView: [
        "contentElement",
        "element",
        "hiddenDisplayMode",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "paneElement",
        "paneHidden",
        "panePlacement",
        "shownDisplayMode"
    ],
    TimePicker: [
        "clock",
        "current",
        "disabled",
        "element",
        "hourPattern",
        "minuteIncrement",
        "minutePattern",
        "onChange",
        "periodPattern"
    ],
    ToggleSwitch: [
        "checked",
        "disabled",
        "element",
        "labelOff",
        "labelOn",
        "onChange",
        "title"
    ],
    ToolBar: [
        "data",
        "element",
        "extraClass",
        "shownDisplayMode"
    ],
    Tooltip: [
        "contentElement",
        "element",
        "extraClass",
        "infotip",
        "innerHTML",
        "onBeforeClose",
        "onBeforeOpen",
        "onClosed",
        "onOpened",
        "placement"
    ]
};

function isEvent(propName) {
    return propName[0] === "o" && propName[1] === "n";
}

function cloneObject(obj) {
    var result = {};
    for (k in obj) { result[k] = obj[k]; }
    return result;
}

function merge(a, b) {
    var result = {};
    if (a) {
        for (k in a) { result[k] = a[k]; }
    }
    if (b) {
        for (k in b) { result[k] = b[k]; }
    }
    return result;
}

function endsWith(s, suffix) {
    return s.length >= suffix.length && s.substr(-suffix.length) === suffix;
}

function arraysShallowEqual(a, b) {
    if (a === b) {
        return true;
    } else if (a.length !== b.length) {
        return false;
    } else {
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
}

function nestedSet(obj, path, value) {
    var parts = path.split(".");
    var allButLast = parts.slice(0, parts.length - 1);
    var last = parts[parts.length - 1];
    var finalObj = allButLast.reduce(function (current, key) {
        return current[key];
    }, obj);
    finalObj[last] = value;
}

function deparent(element) {
    var parent = element.parentNode;
    parent && parent.removeChild(element);
}

function makeClassSet(className) {
    var classSet = {};
    className && className.split(" ").forEach(function (aClass) {
        if (aClass) {
            classSet[aClass] = true;
        }
    });
    return classSet;
}

// TODO: Revisit all of this diffing stuff:
//   - Make it more efficient
//   - It's currently hard to understand because it makes aggressive
//     assumptions (e.g. each item has a key and each item has a winControl)
//   - Is it correct?
//   - Should we just sync an array with a binding list instead of computing
//     edits based on 2 arrays and then applying them to a binding list?
function buildIndex(array) {
    var index = {};
    array.forEach(function (item, i) {
        index[item.key] = i;
    });
    return index;
}
function indexOfKey(array, key) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].key === key) {
            return i;
        }
    }
    return -1;
}
function diffArraysByKey(old, latest) {
    old = old.slice(0);
    var oldIndex = buildIndex(old);
    var latestIndex = buildIndex(latest);
    var edits = [];

    // Handle removals
    for (i = old.length - 1; i >= 0; i--) {
        var item = old[i];
        if (!latestIndex.hasOwnProperty(item.key)) {
            edits.push({ type: "delete", index: i });
            console.log(JSON.stringify(edits[edits.length - 1]));
            old.splice(i, 1);
        }
    }

    // Handle insertions and moves
    for (i = 0; i < latest.length; i++) {
        var item = latest[i];
        if (!oldIndex.hasOwnProperty(item.key)) {
            // Insertion
            edits.push({ type: "insert", index: i, value: item });
            console.log(JSON.stringify({ type: "insert", index: i, value: item.key }));
            old.splice(i, 0, item);
        } else if (old[i].key !== item.key) {
            // Move
            //edits.push({ type: "move", from: oldIndex[item.key], to: i });
            //old.splice(oldIndex[item.key], 1);

            var fromIndex = indexOfKey(old, item.key);
            edits.push({ type: "move", from: fromIndex, to: i });
            console.log(JSON.stringify(edits[edits.length - 1]));
            old.splice(fromIndex, 1);
            old.splice(i, 0, item);
        }
    }

    return edits;
}
function applyEditsToBindingList(list, edits) {
    edits.forEach(function (edit) {
        if (edit.type === "delete") {
            list.splice(edit.index, 1);
        } else if (edit.type === "insert") {
            list.splice(edit.index, 0, edit.value.winControl);
        } else if (edit.type === "move") {
            list.move(edit.from, edit.to);
        } else {
            throw "Unsupported edit type: " + edit.type;
        }
    }, this);
}

// interface IWinJSComponent {
//     winControl
//     element
//     data
//     displayName
// }

// interface IWinJSChildComponent extends IWinJSComponent {
//     key
//     type
// }

function processChildren(componentDisplayName, children, childComponentsMap) {
    var newChildComponents = [];
    var newChildComponentsMap = {};

    React.Children.forEach(children, function (component) {
        if (component) {
            if (component.ref) {
                console.warn(
                    "ref prop (" + component.ref + ") will not work on " +
                    component.type.displayName + " component because it is inside " +
                    "of a " + componentDisplayName + " component"
                );
            }

            if (component.key === null) {
                console.error(
                    component.type.displayName + " component requires a key " +
                    "when inside of a " + componentDisplayName + " component"
                );
            } else {
                var winjsChildComponent = childComponentsMap[component.key];
                if (winjsChildComponent) {
                    if (winjsChildComponent.type === component.type) {
                        winjsChildComponent.update(component);
                    } else {
                        winjsChildComponent.dispose();
                        winjsChildComponent = new WinJSChildComponent(component);
                    }
                } else {
                    winjsChildComponent = new WinJSChildComponent(component);
                }
                newChildComponents.push(winjsChildComponent);
                newChildComponentsMap[component.key] = winjsChildComponent;
            }
        }
    });

    Object.keys(childComponentsMap).forEach(function (key) {
        if (!newChildComponentsMap.hasOwnProperty(key)) {
            childComponentsMap[key].dispose();
        }
    });

    return {
        childComponents: newChildComponents,
        childComponentsMap: newChildComponentsMap
    };
}

var PropHandlers = {
    property: {
        preCtorInit: function property_preCtorInit(element, options, data, displayName, propName, value) {
            options[propName] = value;
        },
        update: function property_update(winjsComponent, propName, oldValue, newValue) {
            if (oldValue !== newValue) {
                winjsComponent.winControl[propName] = newValue;
            }
        }
    },
    domProperty: {
        preCtorInit: function domProperty_preCtorInit(element, options, data, displayName, propName, value) {
            element[propName] = value;
        },
        update: function domProperty_update(winjsComponent, propName, oldValue, newValue) {
            if (oldValue !== newValue) {
                winjsComponent.element[propName] = newValue;
            }
        }
    },
    event: {
        // Can't set options in preCtorInit for events. The problem is WinJS control options
        // use a different code path to hook up events than the event property setters.
        // Consequently, setting an event property will not automatically unhook the event
        // listener that was specified in the options during initialization. To avoid this
        // problem, always go thru the event property setters.
        update: function event_update(winjsComponent, propName, oldValue, newValue) {
            if (oldValue !== newValue) {
                winjsComponent.winControl[propName.toLowerCase()] = newValue;
            }
        }
    },
    domEvent: {
        preCtorInit: function domEvent_preCtorInit(element, options, data, displayName, propName, value) {
            element[propName.toLowerCase()] = value;
        },
        update: function domEvent_update(winjsComponent, propName, oldValue, newValue) {
            if (oldValue !== newValue) {
                winjsComponent.element[propName.toLowerCase()] = newValue;
            }
        }
    },
    //  Enable the addition and removal of CSS classes on the root of the winControl
    //  but don't clobber whatever CSS classes the underlying control may have added
    //  (e.g. don't clobber win-listview).
    winControlClassName: {
        preCtorInit: function winControlClassName_preCtorInit(element, options, data, displayName, propName, value) {
            if (value) {
                element.className = value;
            }
            data[propName] = makeClassSet(value);
        },
        update: function winControlClassName_update(winjsComponent, propName, oldValue, newValue) {
            if (oldValue !== newValue) {
                var oldClassSet = winjsComponent.data[propName] || {};
                var newClassSet = makeClassSet(newValue);
                var elementClassList = winjsComponent.winControl.element.classList;
                for (var className in oldClassSet) {
                    if (!newClassSet[className]) {
                        elementClassList.remove(className);
                    }
                }
                for (var className in newClassSet) {
                    if (!oldClassSet[className]) {
                        elementClassList.add(className);
                    }
                }
                winjsComponent.data[propName] = newClassSet;
            }
        }
    },
    //  Enable the addition and removal of inline styles on the root of the winControl
    //  but don't clobber whatever inline styles the underlying control may have added.
    winControlStyle: {
        preCtorInit: function winControlStyle_preCtorInit(element, options, data, displayName, propName, value) {
            var elementStyle = element.style;
            value = value || {};
            for (var cssProperty in value) {
                elementStyle[cssProperty] = value[cssProperty];
            }
        },
        update: function winControlStyle_update(winjsComponent, propName, oldValue, newValue) {
            if (oldValue !== newValue) {
                oldValue = oldValue || {};
                newValue = newValue || {};
                var elementStyle = winjsComponent.winControl.element.style;
                for (var cssProperty in oldValue) {
                    if (!newValue.hasOwnProperty(cssProperty)) {
                        elementStyle[cssProperty] = "";
                    }
                }
                for (var cssProperty in newValue) {
                    if (oldValue[cssProperty] !== newValue[cssProperty]) {
                        elementStyle[cssProperty] = newValue[cssProperty];
                    }
                }
            }
        }
    },
    warn: function PropHandlers_warn(warnMessage) {
        return {
            update: function warn_update(winjsComponent, propName, oldValue, newValue) {
                console.warn(winjsComponent.displayName + ": " + warnMessage);
            }
        };
    },
    mountTo: function PropHandlers_mountTo(getMountPoint) {
        return {
            update: function mountTo_update(winjsComponent, propName, oldValue, newValue) {
                React.render(newValue, getMountPoint(winjsComponent));
            }
        };
    },
    syncChildrenWithBindingList: function PropHandlers_syncChildrenWithBindingList(bindingListName) {
        return {
            preCtorInit: function syncChildrenWithBindingList_preCtorInit(element, options, data, displayName, propName, value) {
                var latest = processChildren(displayName, value, {});
                data[propName] = {
                    winjsChildComponents: latest.childComponents,
                    winjsChildComponentsMap: latest.childComponentsMap
                };

                options[bindingListName] = new WinJS.Binding.List(
                    latest.childComponents.map(function (winjsChildComponent) {
                        return winjsChildComponent.winControl;
                    })
                );
            },
            update: function syncChildrenWithBindingList_update(winjsComponent, propName, oldValue, newValue) {
                var data = winjsComponent.data[propName] || {};
                var oldChildComponents = data.winjsChildComponents || [];
                var oldChildComponentsMap = data.winjsChildComponentsMap || {};
                var latest = processChildren(winjsComponent.displayName, newValue, oldChildComponentsMap);

                var bindingList = winjsComponent.winControl[bindingListName];
                if (bindingList) {
                    applyEditsToBindingList(
                        bindingList,
                        diffArraysByKey(oldChildComponents, latest.childComponents)
                    );
                } else {
                    winjsComponent.winControl[bindingListName] = new WinJS.Binding.List(latest.childComponents.map(function (winjsChildComponent) {
                        return winjsChildComponent.winControl;
                    }));
                }
                
                winjsComponent.data[propName] = {
                    winjsChildComponents: latest.childComponents,
                    winjsChildComponentsMap: latest.childComponentsMap
                };
            },
            dispose: function syncChildrenWithBindingList_dispose(winjsComponent, propName) {
                var data = winjsComponent.data[propName] || {};
                var childComponents = data.winjsChildComponents || [];
                childComponents.forEach(function (winjsChildComponent) {
                    winjsChildComponent.dispose();
                });
            }
        }
    }
};

function defineControl(controlName, options) {
    options = options || {};
    var winControlOptions = options.winControlOptions || {};
    var propHandlers = options.propHandlers || {};
    var render = options.render || function (component) {
        return React.DOM.div();
    };
    var winjsControlName = options.underlyingControlName || controlName;
    var displayName = controlName;

    function initWinJSComponent(winjsComponent, element, props) {
        winjsComponent.data = {};
        winjsComponent.displayName = displayName;
        winjsComponent.element = element;

        // Give propHandlers that implement preCtorInit the opportunity to run before
        // instantiating the winControl.
        var options = cloneObject(winControlOptions);
        Object.keys(props).forEach(function (propName) {
            var preCtorInit = propHandlers[propName] && propHandlers[propName].preCtorInit;
            if (preCtorInit) {
                preCtorInit(element, options, winjsComponent.data, displayName, propName, props[propName]);
            }
        });
        winjsComponent.winControl = new WinJS.UI[winjsControlName](element, options);        

        // Process propHandlers that don't implement preCtorInit.
        Object.keys(props).forEach(function (propName) {
            var handler = propHandlers[propName];
            if (handler && !handler.preCtorInit) {
                handler.update(winjsComponent, propName, undefined, props[propName]);
            }
        });
    }

    function updateWinJSComponent(winjsComponent, prevProps, nextProps) {
        // Handle props that were added or changed
        Object.keys(nextProps).forEach(function (propName) {
            var handler = propHandlers[propName];
            if (handler) {
                handler.update(winjsComponent, propName, prevProps[propName], nextProps[propName]);
            }
        });

        // Handle props that were removed
        Object.keys(prevProps).forEach(function (propName) {
            if (!nextProps.hasOwnProperty(propName)) {
                var handler = propHandlers[propName];
                if (handler) {
                    handler.update(winjsComponent, propName, prevProps[propName], undefined);
                }
            }
        });
    }

    function disposeWinJSComponent(winjsComponent) {
        winjsComponent.winControl.dispose && winjsComponent.winControl.dispose();
        Object.keys(propHandlers).forEach(function (propName) {
            var handler = propHandlers[propName];
            handler.dispose && handler.dispose(winjsComponent, propName);
        })
    }

    return React.createClass({
        displayName: displayName,
        statics: {
            initWinJSComponent: initWinJSComponent,
            updateWinJSComponent: updateWinJSComponent,
            disposeWinJSComponent: disposeWinJSComponent
        },
        shouldComponentUpdate: function () {
            return false;
        },
        // If choosing to implement componentWillMount, be aware that componentWillMount
        // will run when WinJSChildComponent renders the component to a string via
        // renderRootlessComponent.
        componentDidMount: function () {
            initWinJSComponent(this, this.getDOMNode(), this.props);
        },
        componentWillUnmount: function () {
            disposeWinJSComponent(this);
        },
        componentWillReceiveProps: function (nextProps) {
            updateWinJSComponent(this, this.props, nextProps);
        },
        render: function() {
            return render(this);
        }
    });
}

var hostEl = document.createElement("div");
function renderRootlessComponent(component) {
    var html = React.renderToStaticMarkup(component);
    hostEl.innerHTML = html;
    var element = hostEl.firstElementChild;
    hostEl.removeChild(element);
    return element;
}

// TODO: Is there a better way to solve this problem that WinJSChildComponent solves?
// TODO: Because we're not going thru React's lifecycle, we're missing out on
// validation of propTypes.
// TODO: ref doesn't work on WinJSChildComponents. The reason is that during updates, we
// don't call React.render. Because of this, refs would go stale and only reflect the
// state of the component after its first render. Consequently, we clone the component
// during its first render so it never shows up in refs. This should make it clearer
// that refs don't work than generating stale refs.
function WinJSChildComponent(component) { // implements IWinJSChildComponent
    // Clone the component so a ref isn't generated.
    var clonedComponent = React.addons.cloneWithProps(component);
    var element = renderRootlessComponent(clonedComponent);
    component.type.initWinJSComponent(this, element, component.props);
    this.key = component.key;
    this.type = component.type;
    this._props = component.props;
    this._disposeWinJSComponent = component.type.disposeWinJSComponent;
};
WinJSChildComponent.prototype.update = function (component) {
    component.type.updateWinJSComponent(this, this._props, component.props);
    this._props = component.props;
};
WinJSChildComponent.prototype.dispose = function () {
    this._disposeWinJSComponent(this);
};

var DefaultControlApis = (function processRawApis() {
    var keepProperty = function keepProperty(propertyName) {
        return !endsWith(propertyName.toLowerCase(), "element");
    };

    var result = {};
    Object.keys(RawControlApis).forEach(function (controlName) {
        var propHandlers = {
            className: PropHandlers.winControlClassName,
            style: PropHandlers.winControlStyle,
            // TODO: Instead of special casing id, support DOM attributes
            // more generically.
            id: PropHandlers.domProperty
        };
        RawControlApis[controlName].forEach(function (propName) {
            if (isEvent(propName)) {
                propHandlers[propName] = PropHandlers.event;
            } else if (keepProperty(propName)) {
                propHandlers[propName] = PropHandlers.property;
            }
        });
        result[controlName] = {
            propHandlers: propHandlers
        };
    });
    return result;
})();

function updateWithDefaults(controlApis) {
    Object.keys(controlApis).forEach(function (controlName) {
        var winjsControlName = controlApis[controlName].underlyingControlName || controlName;
        var spec = controlApis[controlName];
        spec.propHandlers = merge(
            DefaultControlApis[winjsControlName].propHandlers,
            spec.propHandlers
        );
    });
    return controlApis;
}

var typeWarnPropHandler = PropHandlers.warn("Invalid prop 'type'. Instead, the command type is" +
    " determined by the component: Button, Toggle, Separator, ContentCommand, FlyoutCommand.");
var CommandSpecs = {
    Button: {
        underlyingControlName: "AppBarCommand",
        winControlOptions: { type: "button" },
        render: function (component) {
            return React.DOM.button();
        },
        propHandlers: {
            type: typeWarnPropHandler,
        }
    },
    Toggle: {
        underlyingControlName: "AppBarCommand",
        winControlOptions: { type: "toggle" },
        render: function (component) {
            return React.DOM.button();
        },
        propHandlers: {
            type: typeWarnPropHandler
        }
    },
    Separator: {
        underlyingControlName: "AppBarCommand",
        winControlOptions: { type: "separator" },
        render: function (component) {
            return React.DOM.hr();
        },
        propHandlers: {
            type: typeWarnPropHandler
        }
    },
    ContentCommand: {
        underlyingControlName: "AppBarCommand",
        winControlOptions: { type: "content" },
        propHandlers: {
            type: typeWarnPropHandler,
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.element;
            })
        }
    },
    FlyoutCommand: {
        underlyingControlName: "AppBarCommand",
        winControlOptions: { type: "flyout" },
        render: function (component) {
            return React.DOM.button();
        },
        propHandlers: {
            type: typeWarnPropHandler,
            flyoutComponent: {
                update: function FlyoutCommand_flyoutComponent_update(winjsComponent, propName, oldValue, newValue) {
                    var data = winjsComponent.data[propName];
                    if (!data) {
                        var flyoutHost = document.createElement("div");
                        flyoutHost.className = "win-react-flyout-host";
                        document.body.appendChild(flyoutHost);
                        winjsComponent.data[propName] = data = {
                            flyoutHost: flyoutHost,
                            flyoutComponent: null
                        };
                    }
                    var oldWinControl = data.flyoutComponent && data.flyoutComponent.winControl;
                    var instance = React.render(newValue, data.flyoutHost);
                    if (oldWinControl !== instance.winControl) {
                        winjsComponent.winControl.flyout = instance.winControl;
                    }
                    winjsComponent.data[propName].flyoutComponent = instance;
                },
                dispose: function FlyoutCommand_flyoutComponent_dispose(winjsComponent, propName) {
                    var data = winjsComponent.data[propName];
                    if (data && data.flyoutHost) {
                        React.unmountComponentAtNode(data.flyoutHost);
                        deparent(data.flyoutHost);
                    }
                }
            }
        }
    }
};

var ControlApis = updateWithDefaults({
    AppBar: {
        propHandlers: {
            children: {
                preCtorInit: function AppBar_children_preCtorInit(element, options, data, displayName, propName, value) {
                    var latest = processChildren(displayName, value, {});
                    data[propName] = {
                        winjsChildComponents: latest.childComponents,
                        winjsChildComponentsMap: latest.childComponentsMap
                    };

                    options.commands = latest.childComponents.map(function (winjsChildComponent) {
                        return winjsChildComponent.winControl;
                    });
                },
                update: function AppBar_children_update(winjsComponent, propName, oldValue, newValue) {
                    var data = winjsComponent.data[propName] || {};
                    var oldChildComponents = data.winjsChildComponents || [];
                    var oldChildComponentsMap = data.winjsChildComponentsMap || {};
                    var latest = processChildren(winjsComponent.displayName, newValue, oldChildComponentsMap);

                    if (!arraysShallowEqual(oldChildComponents, latest.childComponents)) {
                        // TODO: There's currently a bug here because AppBar disposes all
                        // current commands when setting commands even when some of the current
                        // commands are in the new commands array. Maybe not worth finding a
                        // workaround because WinJS's AppBar implementation is changing soon
                        // and when that happens, we should be able to just use
                        // syncChildrenWithBindingList.
                        winjsComponent.winControl.commands = latest.childComponents.map(function (winjsChildComponent) {
                            return winjsChildComponent.winControl;
                        });
                    
                        winjsComponent.data[propName] = {
                            winjsChildComponents: latest.childComponents,
                            winjsChildComponentsMap: latest.childComponentsMap
                        };
                    }
                },
                dispose: function AppBar_children_dispose(winjsComponent, propName) {
                    var data = winjsComponent.data[propName] || {};
                    var childComponents = data.winjsChildComponents || [];
                    childComponents.forEach(function (winjsChildComponent) {
                        winjsChildComponent.dispose();
                    });
                }
            }
        }
    },
    "AppBar.Button": CommandSpecs.Button,
    "AppBar.Toggle": CommandSpecs.Toggle,
    "AppBar.Separator": CommandSpecs.Separator,
    "AppBar.ContentCommand": CommandSpecs.ContentCommand,
    "AppBar.FlyoutCommand": CommandSpecs.FlyoutCommand,
    AutoSuggestBox: {},
    BackButton: {
        render: function (component) {
            return React.DOM.button();
        }
    },
    // CellSpanningLayout: Not a component so just use off of WinJS.UI?
    ContentDialog: {
        propHandlers: {
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.element.querySelector(".win-contentdialog-content");
            })
        }
    },
    DatePicker: {},
    FlipView: {},
    Flyout: {
        // The WinJS Flyout control doesn't come with a good mount point.
        // App content and control content are siblings in Flyout.element.
        // Consequently, if React rendered to Flyout.element, it would destroy
        // some of Flyout's elements. To fix this, we give Flyout a div
        // (className="win-react-flyout-mount-point") which will contain only
        // app content. The React component renders into this div so it doesn't
        // destroy any control content.
        render: function (component) {
            return React.DOM.div(null, React.DOM.div({ className: "win-react-flyout-mount-point" }));
        },
        propHandlers: {
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.element.querySelector(".win-react-flyout-mount-point");
            })
        }
    },
    // GridLayout: Not a component so just use off of WinJS.UI?
    Hub: {
        propHandlers: {
            children: PropHandlers.syncChildrenWithBindingList("sections")
        }
    },
    "Hub.Section": {
        underlyingControlName: "HubSection",
        propHandlers: {
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.contentElement;
            })
        }
    },
    ItemContainer: {
        propHandlers: {
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.element.querySelector(".win-item");
            })
        }
    },
    // ListLayout: Not a component so just use off of WinJS.UI?
    ListView: {},
    // TODO: Keyboarding doesn't work in Menu probably because MenuCommands are not direct
    // children of the Menu.
    Menu: {
        propHandlers: {
            children: {
                // children propHandler looks like this rather than using mountTo on
                // winControl.element because this enables props.children to have
                // multiple components whereas the other technique restricts it to one.
                update: function (winjsComponent, propName, oldValue, newValue) {
                    React.render(React.DOM.div(null, newValue), winjsComponent.winControl.element);
                }
            }
        }
    },
    "Menu.Button": merge(CommandSpecs.Button, {
        underlyingControlName: "MenuCommand"
    }),
    "Menu.Toggle": merge(CommandSpecs.Toggle, {
        underlyingControlName: "MenuCommand"
    }),
    "Menu.Separator": merge(CommandSpecs.Separator, {
        underlyingControlName: "MenuCommand"
    }),
    "Menu.FlyoutCommand": merge(CommandSpecs.FlyoutCommand, {
        underlyingControlName: "MenuCommand"
    }),
    NavBar: {
        // The WinJS NavBar control doesn't come with a good mount point.
        // App content and control content are siblings in NavBar.element.
        // Consequently, if React rendered to NavBar.element, it would destroy
        // some of NavBar's elements. To fix this, we give NavBar a div
        // (className="win-react-navbar-mount-point") which will contain only
        // app content. The React component renders into this div so it doesn't
        // destroy any control content.
        render: function (component) {
            return React.DOM.div(null, React.DOM.div({ className: "win-react-navbar-mount-point" }));
        },
        propHandlers: {
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.element.querySelector(".win-react-navbar-mount-point");
            })
        }
    },
    NavBarCommand: {
        propHandlers: {
            // TODO: Instead of special casing onClick, support DOM attributes
            // more generically.
            onClick: PropHandlers.domEvent
        }
    },
    NavBarContainer: {
        propHandlers: {
            children: PropHandlers.syncChildrenWithBindingList("data")
        }
    },
    Pivot: {
        propHandlers: {
            children: PropHandlers.syncChildrenWithBindingList("items")
        }
    },
    "Pivot.Item": {
        underlyingControlName: "PivotItem",
        propHandlers: {
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.contentElement;
            })
        }
    },
    Rating: {},
    SearchBox: {},
    SemanticZoom: {
        propHandlers: {
            zoomedInComponent: {
                preCtorInit: function zoomedInComponent_preCtorInit(element, options, data, displayName, propName, value) {
                    var child = new WinJSChildComponent(value);
                    // Zoomed in component should be the first child.
                    element.insertBefore(child.winControl.element, element.firstElementChild);
                    data[propName] = child;
                },
                update: function zoomedInComponent_update(winjsComponent, propName, oldValue, newValue) {
                    var child = winjsComponent.data[propName];
                    if (child.type === newValue.type) {
                        child.update(newValue);
                    } else {
                        console.warn("SemanticZoom: zoomedInComponent's component type can't change");
                    }
                },
                dispose: function zoomedInComponent_dispose(winjsComponent, propName) {
                    var child = winjsComponent.data[propName];
                    child && child.dispose();
                }
            },
            zoomedOutComponent: {
                preCtorInit: function zoomedOutComponent_preCtorInit(element, options, data, displayName, propName, value) {
                    var child = new WinJSChildComponent(value);
                    // Zoomed out component should be the second child.
                    element.appendChild(child.winControl.element);
                    data[propName] = child;
                },
                update: function zoomedOutComponent_update(winjsComponent, propName, oldValue, newValue) {
                    var child = winjsComponent.data[propName];
                    if (child.type === newValue.type) {
                        child.update(newValue);
                    } else {
                        console.warn("SemanticZoom: zoomedOutComponent's component type can't change");
                    }
                },
                dispose: function zoomedOutComponent_dispose(winjsComponent, propName) {
                    var child = winjsComponent.data[propName];
                    child && child.dispose();
                }
            }
        }
    },
    SplitView: {
        propHandlers: {
            paneComponent: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.paneElement;
            }),
            contentComponent: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.contentElement;
            })
        }
    },
    TimePicker: {},
    ToggleSwitch: {},
    ToolBar: {
        propHandlers: {
            children: PropHandlers.syncChildrenWithBindingList("data")
        }
    },
    "ToolBar.Button": CommandSpecs.Button,
    "ToolBar.Toggle": CommandSpecs.Toggle,
    "ToolBar.Separator": CommandSpecs.Separator,
    "ToolBar.ContentCommand": CommandSpecs.ContentCommand,
    "ToolBar.FlyoutCommand": CommandSpecs.FlyoutCommand,
    Tooltip: {
        propHandlers: {
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.element;
            }),
            contentComponent: {
                update: function (winjsComponent, propName, oldValue, newValue) {
                    if (!winjsComponent.winControl.contentElement) {
                        winjsComponent.winControl.contentElement = document.createElement("div");
                    }
                    React.render(newValue, winjsComponent.winControl.contentElement);
                }
            }
        }
    }
});

// Sort to ensure that controls come before their subcontrols
// (e.g. AppBar comes before AppBar.Toggle).
Object.keys(ControlApis).sort().forEach(function (controlName) {
    nestedSet(ReactWinJS, controlName, defineControl(controlName, ControlApis[controlName]));
});

// Given a function that returns a React component,
// returns an item renderer function that can be used
// with WinJS controls. Useful for describing FlipView
// and ListView item templates as React components.
ReactWinJS.reactRenderer = function reactRenderer(componentFunction) {
    return function itemRenderer(itemPromise) {
        return itemPromise.then(function (item) {
            var element = document.createElement("div");
            React.render(componentFunction(item), element);
            return element;
        });
    }
};

module.exports = ReactWinJS;