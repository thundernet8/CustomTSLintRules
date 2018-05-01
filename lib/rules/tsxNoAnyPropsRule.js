"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const Lint = require("tslint");
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new NoAnyPropsWalker(sourceFile, this.getOptions()));
    }
}
Rule.metadata = {
    ruleName: "tsx-no-any-props",
    description: "Forbidden the usage of `any` props in typescript-react component",
    optionsDescription: "Not configurable.",
    options: null,
    optionExamples: ["true"],
    type: "functionality",
    typescriptOnly: true
};
Rule.FAILURE_STRING = "Props of React component should not be any";
exports.Rule = Rule;
class NoAnyPropsWalker extends Lint.RuleWalker {
    visitClassDeclaration(node) {
        if (node.heritageClauses) {
            node.heritageClauses.forEach(({ types }) => {
                types.forEach(({ expression, typeArguments }) => {
                    const expressionTxt = expression.getText();
                    if (Array.isArray(typeArguments) &&
                        typeArguments.length > 0 &&
                        [
                            "React.Component",
                            "React.PureComponent",
                            "Component",
                            "PureComponent"
                        ].includes(expressionTxt)) {
                        const propsNode = typeArguments[0];
                        if (propsNode !== undefined &&
                            propsNode !== null &&
                            propsNode.kind === ts.SyntaxKind.AnyKeyword) {
                            this.addFailureAtNode(propsNode, Rule.FAILURE_STRING);
                        }
                    }
                });
            });
        }
        super.visitClassDeclaration(node);
    }
}
