<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">BLOCKCHAIN ENABLED CONTACT TRACING</h3>
  <br />

  <p align="center">
    An exploration and demo of how we can use Blockchain for Contact Tracing
    <br />
    <!-- <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a> -->
    <br />
    <!-- <a href="https://github.com/github_username/repo_name">View Demo</a> -->
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project
In times of a pandemic like Covid-19, it is crucial that an **effective contact tracing** solution be in place so that we can directly reduce the number of infected people, and thereby saving lives. **Effective contact tracing** implies both that the data is accurate and reliable **and** there is a high percentage of adoption by the public.  

Despite a plethora of existing digital contact tracing solutions, the problems that plague it include:

* Data collection is not minimised.
* Centralised storage of data.
* Lack of transparency about who can access this data.
* It is limited to geographic entities such as nations. A pandemic makes no such discrimination. 

The impact of such policies has been that adoption rates are as low as **10%-15%** of the population. 

This project is a proof of concept of how Blockchain can be used in Contact Tracing, and influence the uptake of digital contact tracing solutions.

[![Product Name Screen Shot][product-screenshot]](https://example.com)

<!-- Here's a blank template to get started:
**To avoid retyping too much info. Do a search and replace with your text editor for the following:**
`github_username`, `repo_name`, `twitter_handle`, `email` -->



<!-- ### Built With

* []()
* []()
* []() -->



<!-- GETTING STARTED -->
<br>

## Getting Started

To get a local copy up and running follow these simple steps:

### Prerequisites

<!-- The blockchain can either deployed locally on your machine, or you can interact with an already hosted blockchain. You can also host your won blockchain. The specific commands can be found in the relevant subheadings. The following commands are common for both cases.  -->

If you're installing npm or node for the first time, 

* npm
```sh
npm install npm@latest -g
```
* node
```sh
npm install -g node@10.15.0
```
* web3
```sh
npm install web3 
```
* installing server-side packages: express, cheerio and got
```sh
npm install express cheerio got
```

* solidity
```sh
npm install -g solc@0.5.16
```

#### Metamask 
You need to have a browser extension called **Metamask** installed. This is to interact with the hosted blockchain. You can download it from the following link:
<br>
<a href = "https://metamask.io/">Download Metamask</a>

<br>

### Installation

Clone the repo in your desired folder.
```sh
git clone https://github.com/github_username/repo_name.git
```


<!-- USAGE EXAMPLES -->
## Usage
* Installing Metamask prompts you to create a user account. Create a user account, and keep your password and user ID safe. 
* The blockchain smart contract is deployed on the Rinkeby Testnet. You will be interacting with the existing smart contract, and for that you need some test ether. The following steps will tell you how to do so: 
    * Click on the following <a href = "">link</a>
    * Copy the address given there and make a post on either twitter or facebook. The post can be private. 
    * Copy the link of the post and past it <a href = "">here</a>
    * Request for 3 ether in 8 hours (as it's the fastest, and sufficient)
    * In your metamask wallet, you should be see 3 ether deposited in your account. 


* Enter the directory where the repo exists. Open the terminal/command prompt in that folder. 
* Enter the following command: 
```sh
node server.js
```
* Now, the server is running, and listening on port 8080. You can change it to any port of your choice. 
On the browser, run:
```sh
http://localhost:8080/contact_tracing/1
http://localhost:8080/contact_tracing/2
```
The page called contact_tracing1 is the hospital admin's view, and contact_tracing2 is the patient's view. 
* Click on "Generate Password" on contact_tracing1. This takes you to the patient persona, where the patient is notified to be unwell. 
* Authenticate the password. Upload the data onto the blockchain using the upload button. 
* On the alternate phone, you will be seeing a notification saying the 2nd person has been infected.  

<!-- Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources. -->

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/github_username/repo_name/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Anind Kiran  - anindk1999@hotmail.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* []()
* []()
* []()





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/github_username/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/anind-k-621447197/
[product-screenshot]: images/screenshot.png
