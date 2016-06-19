# JSX loader for webpack

## Usage:

```js
{..., loader: 'jsx-loader'}
```

To enable ES6 features, use `?harmony` in your loader config. To auto insert the pragma required to process the file use the insertPragma parameter e.g. `?insertPragma=React.DOM`. [Flow]-style type annotations can be stripped using `?stripTypes`.


[Flow]: http://flowtype.org/
