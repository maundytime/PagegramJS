## Usage

1. Fork the PagegramJS project, then import it into a newly created Github Codespace.
2. Install the necessary packages by running `npm install`.
3. Install the XO plugin for Github Codespace.
4. Use project `example` as an example for building your own project.
   - More examples: `story0`, `story1`, `story2`.
   - The `home` project serves as the launcher app for Pagegram's homepage. Note that the NativeHomeModule in this project is currently not available for public use.
   - Export all pages and functions, and a page named `root`, like the structure in `example/index.ts`.
5. Once your project is complete, run `node your-project/build.js` to generate `bundle/bundle.js`.
6. In Pagegram, create a new project and import the contents of the `bundle.js` file.
