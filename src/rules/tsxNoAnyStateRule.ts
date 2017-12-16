import * as ts from "typescript";
import * as Lint from "tslint";

export class Rule extends Lint.Rules.AbstractRule {
    // tslint:disable object-literal-sort-keys
    public static metadata: Lint.IRuleMetadata = {
        ruleName: "tsx-no-any-state",
        description: "Forbidden the usage of `any` state in typescript-react component",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "functionality",
        typescriptOnly: true
    };
    // tslint:enable object-literal-sort-keys

    public static FAILURE_STRING = "State of React component should not be any";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoAnyStateWalker(sourceFile, this.getOptions()));
    }
}

class NoAnyStateWalker extends Lint.RuleWalker {
    public visitClassDeclaration(node: ts.ClassDeclaration) {
        node.heritageClauses.forEach(({ types }) => {
            types.forEach(({ expression, typeArguments }) => {
                const expressionTxt = expression.getText();
                if (
                    Array.isArray(typeArguments) &&
                    typeArguments.length > 1 &&
                    [
                        "React.Component",
                        "React.PureComponent",
                        "Component",
                        "PureComponent"
                    ].includes(expressionTxt)
                ) {
                    // if state is any type
                    const propsNode: ts.TypeNode = typeArguments[1];
                    if (
                        propsNode !== undefined &&
                        propsNode !== null &&
                        propsNode.kind === ts.SyntaxKind.AnyKeyword
                    ) {
                        this.addFailure(
                            this.createFailure(
                                propsNode.getStart(),
                                propsNode.getWidth(),
                                Rule.FAILURE_STRING
                            )
                        );
                    }
                }
            });
        });

        super.visitClassDeclaration(node);
    }
}
