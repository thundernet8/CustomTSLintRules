"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const Lint = require("tslint");
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new NoAnyStateWalker(sourceFile, this.getOptions()));
    }
}
Rule.metadata = {
    ruleName: "tsx-no-any-state",
    description: "Forbidden the usage of `any` state in typescript-react component",
    optionsDescription: "Not configurable.",
    options: null,
    optionExamples: ["true"],
    type: "functionality",
    typescriptOnly: true
};
Rule.FAILURE_STRING = "State of React component should not be any";
exports.Rule = Rule;
class NoAnyStateWalker extends Lint.RuleWalker {
    visitClassDeclaration(node) {
        if (node.heritageClauses) {
            node.heritageClauses.forEach(({ types }) => {
                types.forEach(({ expression, typeArguments }) => {
                    const expressionTxt = expression.getText();
                    if (Array.isArray(typeArguments) &&
                        typeArguments.length > 1 &&
                        [
                            "React.Component",
                            "React.PureComponent",
                            "Component",
                            "PureComponent"
                        ].includes(expressionTxt)) {
                        const propsNode = typeArguments[1];
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
