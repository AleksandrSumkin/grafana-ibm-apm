System.register(['app/plugins/sdk', 'lodash'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var sdk_1, lodash_1;
    var IPMQueryCtrl;
    return {
        setters:[
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            IPMQueryCtrl = (function (_super) {
                __extends(IPMQueryCtrl, _super);
                /** @ngInject **/
                function IPMQueryCtrl($scope, $injector) {
                    _super.call(this, $scope, $injector);
                    this.timeAttributes = [
                        { name: 'TIMESTAMP', value: 'TIMESTAMP' },
                        { name: 'WRITETIME', value: 'WRITETIME' }
                    ];
                    this.valueAttributes = [
                        { name: 'value', value: 'value' },
                        { name: 'displayValue', value: 'displayValue' }
                    ];
                    var target_defaults = {
                        target: 'Select Agent Type',
                        AttributeGroup: 'Select AttributeGroup',
                        Attribute: 'Select Attribute',
                        AgentInstance: 'Select Agent'
                    };
                    lodash_1.default.defaultsDeep(this.target, target_defaults);
                    this.target.timeAttribute = this.target.timeAttribute || 'WRITETIME';
                    this.target.valueAttribute = this.target.valueAttribute || 'displayValue';
                }
                ;
                IPMQueryCtrl.prototype.getAgentTypes = function () {
                    var _this = this;
                    if (this.at) {
                        return Promise.resolve(this.at);
                    }
                    else {
                        return this.datasource.getAgentTypes()
                            .then(function (items) {
                            _this.at = items;
                            return items;
                        });
                    }
                };
                IPMQueryCtrl.prototype.AgentTypes = function () {
                    return this.getAgentTypes().then(function (items) {
                        return lodash_1.default.map(items, function (item) {
                            return { text: item.description + '  -->  ' + item.id, value: item.id };
                        });
                    });
                };
                IPMQueryCtrl.prototype.getAttributeGroups = function () {
                    var _this = this;
                    var target = this.target.target;
                    return this.datasource.getAttributeGroups(target)
                        .then(function (items) {
                        _this.ag = items;
                        return items;
                    });
                };
                IPMQueryCtrl.prototype.AttributeGroups = function () {
                    return this.getAttributeGroups().then(function (items) {
                        var filtered = items.filter(function (item) { return item.notAvailableInPreFetch != true; });
                        return filtered.map(function (item) {
                            return { text: item.description + '  -->  ' + item.id, value: item.id };
                        });
                    });
                };
                IPMQueryCtrl.prototype.getAgentInstances = function () {
                    var _this = this;
                    var name = this.target.target;
                    return this.datasource.getAgentInstances(name)
                        .then(function (items) {
                        _this.ai = items;
                        return items;
                    });
                };
                IPMQueryCtrl.prototype.AgentInstances = function () {
                    return this.getAgentInstances().then(function (items) {
                        return lodash_1.default.map(items, function (item) {
                            return { text: item.value, value: item.value };
                        });
                    });
                };
                IPMQueryCtrl.prototype.getAttributes = function () {
                    var _this = this;
                    var target = this.target.target;
                    var aG = this.target.AttributeGroup;
                    return this.datasource.getAttributes(target, aG)
                        .then(function (items) {
                        _this.atr = items;
                        return items;
                    });
                };
                IPMQueryCtrl.prototype.Attributes = function () {
                    return this.getAttributes().then(function (items) {
                        return lodash_1.default.map(items, function (item) {
                            return { text: item.label + '  -->  ' + item.id, value: item.id };
                        });
                    });
                };
                IPMQueryCtrl.prototype.getPrimaryKey = function () {
                    var _this = this;
                    var target = this.target.target;
                    var aG = this.target.AttributeGroup;
                    return this.datasource.getPrimaryKey(target, aG)
                        .then(function (items) {
                        _this.pk = items;
                        return items;
                    });
                };
                IPMQueryCtrl.prototype.PrimaryKey = function () {
                    return this.getPrimaryKey().then(function (items) {
                        return lodash_1.default.map(items, function (item) {
                            return { text: item.label + '  -->  ' + item.id, value: item.id };
                        });
                    });
                };
                IPMQueryCtrl.prototype.onChangeInternal = function () {
                    this.refresh();
                };
                IPMQueryCtrl.prototype.onChangeInternal1 = function () {
                    var _this = this;
                    delete this.target.PrimaryKey;
                    this.getPrimaryKey().then(function (items) {
                        if (lodash_1.default.isEmpty(_this.pk)) {
                            //console.log('empty');
                            document.getElementById("pk").style.visibility = 'hidden';
                        }
                        else {
                            //console.log('full');
                            document.getElementById("pk").style.visibility = 'visible';
                        }
                    });
                    this.refresh();
                };
                IPMQueryCtrl.templateUrl = 'partials/query.editor.html';
                return IPMQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("IPMQueryCtrl", IPMQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map