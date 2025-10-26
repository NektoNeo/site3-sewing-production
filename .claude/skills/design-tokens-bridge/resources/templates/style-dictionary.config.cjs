module.exports = {
  source: ['resources/tokens/tokens.json','resources/tokens/tokens.example.json'],
  platforms: {
    css: { transformGroup: 'css', buildPath: 'generated/', files: [{ destination: 'theme.css', format: 'css/variables', options: { selector: ':root' } }] }
  }
};
