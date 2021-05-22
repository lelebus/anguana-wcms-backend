# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.1](http://git-codecommit.eu-west-1.amazonaws.com///compare/v2.0.0...v2.0.1) (2021-01-07)


### Bug Fixes

* **order:** empty deliverySlot for declined order ([aade362](http://git-codecommit.eu-west-1.amazonaws.com///commit/aade362625bf1a21511bc921dd77b596ca2de277))

## [2.0.0](http://git-codecommit.eu-west-1.amazonaws.com///compare/v1.0.1...v2.0.0) (2020-12-23)


### ⚠ BREAKING CHANGES

* **order:** remove notes from product order -> order

### Features

* **notification:** add notifications through whatsapp ([b815ba1](http://git-codecommit.eu-west-1.amazonaws.com///commit/b815ba129d906221f495353638069938152de0f8))
* **notification:** send auth token + shipping details ([d799f18](http://git-codecommit.eu-west-1.amazonaws.com///commit/d799f18de781ab9cac7e8c4162aa512654135801))
* **order:** add notes to order ([81961a3](http://git-codecommit.eu-west-1.amazonaws.com///commit/81961a319fbde625919ad86124edbb7bc143fabc))
* **order:** add timeslot to queries and objects ([89f9435](http://git-codecommit.eu-west-1.amazonaws.com///commit/89f943515c7fbfacdbd06376a5f47f95cd900d9e))
* **order:** basic setup with db specific ([d0fa948](http://git-codecommit.eu-west-1.amazonaws.com///commit/d0fa948eedeea05d5d29e4c90a31e0dcfae860bf))
* **order:** data access layer with tests ([a6c4817](http://git-codecommit.eu-west-1.amazonaws.com///commit/a6c4817e81daef96de92e9d90bb90c73bcdbf8c4))
* **order:** getBookedTimeSlots service and data access ([fdddf78](http://git-codecommit.eu-west-1.amazonaws.com///commit/fdddf78c4bd2278dfa08fbd6359abbe332b587db))
* **order:** service and data access integrated ([f33a936](http://git-codecommit.eu-west-1.amazonaws.com///commit/f33a936fae582c56a2283c5ea22430ef26be2539))
* **user:** add language attribute ([fe21209](http://git-codecommit.eu-west-1.amazonaws.com///commit/fe21209cc1251b2998e10f3f96f08fb7e29f5ea4))


### Bug Fixes

* remove merge conflict comments ([1932f71](http://git-codecommit.eu-west-1.amazonaws.com///commit/1932f71cd31469dd6a01fdc78a603e624f030ccc))
* **order:** full order checkout for customer + admin panel ([b3ac74f](http://git-codecommit.eu-west-1.amazonaws.com///commit/b3ac74fcfdcba5984596f803be47937f79c4201b))
* **order:** remove backend totalPrice logic ([e931b51](http://git-codecommit.eu-west-1.amazonaws.com///commit/e931b5167fa76a877806c936953fe5f0f6e13144))
* **order:** set proper details on product and orders ([5bdf199](http://git-codecommit.eu-west-1.amazonaws.com///commit/5bdf19966ce7c02068a150d34409b3d4a914453b))
* **order + user:** incongruences between schema and resolvers ([97278d4](http://git-codecommit.eu-west-1.amazonaws.com///commit/97278d439fd0cbcb0c15b798ce52416d21378c83))
* **user:** normalize phone number and set proper roles in cookie ([87a0d4d](http://git-codecommit.eu-west-1.amazonaws.com///commit/87a0d4d398701ee903407a1c6efbe7931e920c01))
* **user:** resolvers and returns ([652c01d](http://git-codecommit.eu-west-1.amazonaws.com///commit/652c01df55bb2d0a9e6dfd7f4525bae820242fe2))

### [1.0.1](http://git-codecommit.eu-west-1.amazonaws.com///compare/v1.0.0...v1.0.1) (2020-12-23)


### Bug Fixes

* **notification:** format hours, months, etc. numbers ([23c65aa](http://git-codecommit.eu-west-1.amazonaws.com///commit/23c65aa4d97db87d1a2ae6dbf0d5928525223bf1))

## [1.0.0](http://git-codecommit.eu-west-1.amazonaws.com///compare/v0.2.0...v1.0.0) (2020-12-15)

## [0.2.0](http://git-codecommit.eu-west-1.amazonaws.com///compare/v0.1.2...v0.2.0) (2020-12-15)


### ⚠ BREAKING CHANGES

* first release

### Features

* first official release ([e449ca1](http://git-codecommit.eu-west-1.amazonaws.com///commit/e449ca14db392f11d1852d7f60e0db4c2dd24151))

### [0.1.2](http://git-codecommit.eu-west-1.amazonaws.com///compare/v0.1.1...v0.1.2) (2020-12-15)

### [0.1.1](http://git-codecommit.eu-west-1.amazonaws.com///compare/v1.1.0...v0.1.1) (2020-10-27)

## 1.1.0 (2020-10-27)


### Features

* **price:** save different prices and weight units ([8ab7452](http://git-codecommit.eu-west-1.amazonaws.com///commit/8ab7452013ba4075bd315d0f9a974b3a23734caa))
* **product:** add filter by type to getProducts ([f814ffb](http://git-codecommit.eu-west-1.amazonaws.com///commit/f814ffb783e2d14e9a5c1347b8b444fb3022e657))
* **product:** remove avgPrice mandatory ([2809363](http://git-codecommit.eu-west-1.amazonaws.com///commit/28093632105a611f55ac67df0e74996981e54363))
* **product model:** add origin field ([6b9704e](http://git-codecommit.eu-west-1.amazonaws.com///commit/6b9704e49b030aef4be3f6868b48b589fe445338))
* complete admin panel features ([f51a156](http://git-codecommit.eu-west-1.amazonaws.com///commit/f51a156eeea5620e0d754280d51907735dc2a3e4))
* **product:** resolvers to set whole product/product model or single field ([1aff7b9](http://git-codecommit.eu-west-1.amazonaws.com///commit/1aff7b9d113f0b2067a4aae0216efe450c97ab89))
* **product:** service and data access for image upload of products and productModels ([e849de8](http://git-codecommit.eu-west-1.amazonaws.com///commit/e849de8f3ef1a7136be2f493fe68d0a2d647c6cf))
* add service for uploading public files to aws S3 ([6a7f062](http://git-codecommit.eu-west-1.amazonaws.com///commit/6a7f0628105a0cebdaca529ec5f06c0f82f15656))
* **product:** add resolvers and services - no test ([e1c0949](http://git-codecommit.eu-west-1.amazonaws.com///commit/e1c0949d770f5840fcdb8d91ecf0a5d965a343c2))
* **product model:** add resolvers and services - no test ([ff12ace](http://git-codecommit.eu-west-1.amazonaws.com///commit/ff12ace039e0d847f32b387b718b214748cc2eb3))
* **product model:** return all product models if no parent is given ([1a86df4](http://git-codecommit.eu-west-1.amazonaws.com///commit/1a86df467b0728983485337caf7b396554cd7545))
* **products:** add queries for products and productModels - no test ([2f9c4f6](http://git-codecommit.eu-west-1.amazonaws.com///commit/2f9c4f610de8d08bbb9ce58c78ac0d3089a08343))
* **setting:** add resolvers and services ([0b0af5f](http://git-codecommit.eu-west-1.amazonaws.com///commit/0b0af5fa6a7941c6dc079635eb8accb1deba6ecc))
* **setting:** data access functions and queries ([6821394](http://git-codecommit.eu-west-1.amazonaws.com///commit/68213941b55e1307f1835ea863492726e2d4b7b4))
* **user:** add tester admin in database ([f646487](http://git-codecommit.eu-west-1.amazonaws.com///commit/f64648702fa5ebf12a0460cb491b002bbca455a7))
* **user:** added resolvers and services - no test ([5b48d70](http://git-codecommit.eu-west-1.amazonaws.com///commit/5b48d702adb8d38765e6e568b7fb1033ee64a5db))
* **user:** data access functions and queries ([17c7046](http://git-codecommit.eu-west-1.amazonaws.com///commit/17c704688789d21bd7efa444be8834344caf0940))


### Bug Fixes

* **auth:** store and match lowercase emails ([4f3a98c](http://git-codecommit.eu-west-1.amazonaws.com///commit/4f3a98c55e3aed1b860601181a23a754eb0cd543))
* **hack:** force user to be ADMIN, with specific id ([136603b](http://git-codecommit.eu-west-1.amazonaws.com///commit/136603b7d3d645950f756211986354ae0f768ecf))
* **product:** fix typo in getProducts ([2e04910](http://git-codecommit.eu-west-1.amazonaws.com///commit/2e04910ba2998cb4252bfde03dd425836fc6905f))
* **product:** image upload - manual test ([c617013](http://git-codecommit.eu-west-1.amazonaws.com///commit/c6170137d9787224fe27a5ee84dce358246ec7fd))
* **product:** price types and mandatory fields ([07ca442](http://git-codecommit.eu-west-1.amazonaws.com///commit/07ca44237257cbabb2dd7ba32cd15b1f3da6200d))
* **product:** return imageUrl ([15545c6](http://git-codecommit.eu-west-1.amazonaws.com///commit/15545c6b846c8361c90c66f2133a239b08537e3e))
* **product:** save different prices and weight units ([bce85f7](http://git-codecommit.eu-west-1.amazonaws.com///commit/bce85f792e0b6b4db49847b6e7c8bbaa5f2ae03c))
* **product model:** change copy-paste error avgPrice to price ([4402472](http://git-codecommit.eu-west-1.amazonaws.com///commit/440247251b83d7b43ef9be6968138fd6bdc6b81a))
* **product model:** select also parent from model products ([dfb7095](http://git-codecommit.eu-west-1.amazonaws.com///commit/dfb7095c10bfc2e1fbb44830992205688afeb3b0))
* **user:** change user.role to user.permissions ([86ee5b1](http://git-codecommit.eu-west-1.amazonaws.com///commit/86ee5b11726280f807b046ebd994b796b07243e5))
* return new ForbiddenError ([234828d](http://git-codecommit.eu-west-1.amazonaws.com///commit/234828dfe7c22b0ecfe2a7fed4b92fb005ccdb9a))
