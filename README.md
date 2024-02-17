# Saavan Post

Saavan Post is a tool for posting data to topgg for (Oceanic.js) Library only

## Installation

You can install Saavan Post via npm:

```bash
npm install saavan-post
```

## Usage

```javascript
const { AutoPoster } = require('saavan-post');

// Example usage
const post = AutoPoster(this.client.config.topgg, this.client);
post.on('posted', () => {
   console.log('Server count posted!');
});
```

## Features

- Post data to top.gg easily
- Simple to integrate into existing projects.
- Support comming in every library soon

## Documentation

For detailed documentation, please refer to the [Wiki](https://github.com/AkAbhijit/saavan-post/wiki).

## Contributing

Contributions are welcome! Please check out the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project was inspired by XYZ.
- Special thanks to ABC for their contributions.

## Contact

For any inquiries or feedback, please contact [author-name](devabhijit11@gmail.com).
