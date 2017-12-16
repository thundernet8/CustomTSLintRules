import * as Lint from "tslint";
import { EMPTY_CONFIG, IConfigurationFile } from "tslint/lib/configuration";

export default class Linter {
    private config: IConfigurationFile;
    private linter: Lint.Linter;
    public constructor() {
        this.config = EMPTY_CONFIG;
        this.config.rules.clear();
        this.linter = new Lint.Linter(
            {
                fix: false,
                formatter: "json",
                formattersDirectory: undefined,
                rulesDirectory: "./lib/rules"
            },
            undefined
        );
    }

    public addRule(rule: string, options?: string[]) {
        this.config.rules.set(rule, {
            ruleArguments: [true, ...(options || [])],
            ruleName: rule
        });
    }

    public lint(source): Lint.LintResult {
        this.linter.lint("FileName.ts", source, this.config);
        return this.linter.getResult();
    }
}
