## Usage

1. Fork the PagegramJS project, then import it into a newly created Github Codespace.
2. Install the necessary packages by running `npm install`.
3. Use project `projects/example` as an example for building your own project.
   - More examples: `projects/story0`, `projects/story1`, `projects/story2`, `projects/tarot`.
   - The `projects/hub` project serves as the launcher app for Pagegram. Note that the NativeHubModule in this project is currently not available for public use.
   - Like the structure in `example/index.ts`, export all pages and functions with a page named `root`.
5. Run `node build` to generate `bundle/bundle.js` in your project.
6. In Pagegram, create a new project and import the contents of the `bundle.js` file.
