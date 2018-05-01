import * as ts from "typescript";
import * as Lint from "tslint";

export class Rule extends Lint.Rules.AbstractRule {
    // tslint:disable object-literal-sort-keys
    public static metadata: Lint.IRuleMetadata = {
        ruleName: "tsx-no-any-props",
        description: "Forbidden the usage of `any` props in typescript-react component",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "functionality",
        typescriptOnly: true
    };
    // tslint:enable object-literal-sort-keys

    public static FAILURE_STRING = "Props of React component should not be any";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoAnyPropsWalker(sourceFile, this.getOptions()));
    }
}

class NoAnyPropsWalker extends Lint.RuleWalker {
    public visitClassDeclaration(node: ts.ClassDeclaration) {
        if (node.heritageClauses) {
            node.heritageClauses.forEach(({ types }) => {
                types.forEach(({ expression, typeArguments }) => {
                    const expressionTxt = expression.getText();
                    if (
                        Array.isArray(typeArguments) &&
                        typeArguments.length > 0 &&
                        [
                            "React.Component",
                            "React.PureComponent",
                            "Component",
                            "PureComponent"
                        ].includes(expressionTxt)
                    ) {
                        // if props is any type
                        const propsNode: ts.TypeNode = typeArguments[0];
                        if (
                            propsNode !== undefined &&
                            propsNode !== null &&
                            propsNode.kind === ts.SyntaxKind.AnyKeyword
                        ) {
                            this.addFailureAtNode(
                                propsNode,
                                Rule.FAILURE_STRING
                            );
                        }
                    }
                });
            });
        }

        super.visitClassDeclaration(node);
    }
}
