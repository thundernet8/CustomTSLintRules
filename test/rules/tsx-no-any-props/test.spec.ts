import * as Lint from "tslint";
import * as assert from "assert";
import Linter from "../../linter";

const cases = [
    {
        source: `export default class YourComponentName extends React.Component{
            render() {
                return null;
            }
        }`,
        success: true
    },
    {
        source: `export default class YourComponentName extends React.Component<any, any>{
            render() {
                return null;
            }
        }`,
        success: false
    },
    {
        source: `export default class YourComponentName extends React.Component<{}, any>{
            render() {
                return null;
            }
        }`,
        success: true
    },
    {
        source: `export default class YourComponentName extends React.Component<any>{
            render() {
                return null;
            }
        }`,
        success: false
    },
    {
        source: `export default class YourComponentName extends React.Component<{}>{
            render() {
                return null;
            }
        }`,
        success: true
    },
    {
        source: `export default class YourComponentName extends React.Component<YourComponentNameProps>{
            render() {
                return null;
            }
        }`,
        success: true
    }
];

describe("tsx-no-any-props", () => {
    cases.forEach(({ source, success }, index) => {
        it(`Props of React component should not be any [Case ${index + 1}]`, () => {
            const linter = new Linter();
            linter.addRule("tsx-no-any-props");
            const result = linter.lint(source);
            assert.equal(result.errorCount === 0, success);
        });
    });
});
