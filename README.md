<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/lagschwein/OpenType">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">OpenType</h3>

  <p align="center">
    AI generated minimalistic typing test 
    <br />
    <br />
    <!-- <a href="https://github.com/lagschwein/OpenType">View Demo</a>
    ·
    <a href="https://github.com/lagschwein/OpenType/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/lagschwein/OpenType/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequesets](#prerequesets)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

🚧 OpenType is currently a WIP

OpenType is a minimalist typing test with ai generated tests. It takes alot of inspiration from [monkeytype](https://monkeytype.com).

Currently it is very slow and uses webgpu to accelerate the typing test generation. So, user experience will vary depending on hardware.


### Built With

* [![React][React.js]][React-url]
* [![Tailwindcss][Tailwindcss.com]][Tailwindcss-url]




<!-- GETTING STARTED -->
## Getting Started

Still WIP so run application in dev mode

### Prerequesets

1. Install tailwindcss
   ```sh
   npm install -D tailwindcss
   ```
2. Initialize tailwindcss
   ```sh
   npx tailwindcss init
   ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/lagschwein/OpenType.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. Start dev server 
   ```sh
   npm run dev
   ```
2. When modifying styling make sure tailwind cli is running
   ```sh
   npx tailwindcss -i ./src/index.css -o ./src/output.css --watch
   ```

> [!NOTE]
> webgpu is currently only supported on select browsers so make sure to use a compatible browser when running the project e.g. Chrome 113^, Edge 113^


<!-- ROADMAP -->
## Roadmap

- [ ] Refactor everything
  - [ ] Create MLCEngine in seperate thread so UI isn't blocked
- [ ] Support for randomly generated test while model download is happening
- [ ] Pick and choose from lots of themes
- [ ] Improve stats processing and display
- [ ] Enter your own prompt to customize the type of tests generated
- [ ] Support for generating code typing tests

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
<!-- ## License

Distributed under the MIT License. See `LICENSE.txt` for more information. -->




<!-- CONTACT -->
<!-- ## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/lagschwein/OpenType](https://github.com/lagschwein/OpenType) -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/lagschwein/OpenType.svg?style=for-the-badge
[contributors-url]: https://github.com/lagschwein/OpenType/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lagschwein/OpenType.svg?style=for-the-badge
[forks-url]: https://github.com/lagschwein/OpenType/network/members
[stars-shield]: https://img.shields.io/github/stars/lagschwein/OpenType.svg?style=for-the-badge
[stars-url]: https://github.com/lagschwein/OpenType/stargazers
[issues-shield]: https://img.shields.io/github/issues/lagschwein/OpenType.svg?style=for-the-badge
[issues-url]: https://github.com/lagschwein/OpenType/issues
[license-shield]: https://img.shields.io/github/license/lagschwein/OpenType.svg?style=for-the-badge
[license-url]: https://github.com/lagschwein/OpenType/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Tailwindcss.com]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[React-url]: https://reactjs.org/
[Tailwindcss-url]: https://tailwindcss.com/