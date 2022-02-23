## [3.3.1](https://github.com/ksalzke/defer-tag-omnifocus-plugin/compare/v3.3.0...v3.3.1) (2022-02-23)


### Bug Fixes

* :bug: fix bug where error would occur if a previously-scheduled tag had been deleted ([4df0ad8](https://github.com/ksalzke/defer-tag-omnifocus-plugin/commit/4df0ad858d98afb16d6291c6919bac84b51908c1))



# [3.3.0](https://github.com/ksalzke/defer-tag-omnifocus-plugin/compare/v3.2.0...v3.3.0) (2022-02-19)


### Features

* :sparkles: update validation so actions always available ([79112e5](https://github.com/ksalzke/defer-tag-omnifocus-plugin/commit/79112e5e3d817645f3f4a2178bf5063b4f30e132))



# [3.2.0](https://github.com/ksalzke/defer-tag-omnifocus-plugin/compare/v3.1.0...v3.2.0) (2022-02-04)


### Features

* :sparkles: add Keyboard Maestro macro to repo and instructions to README ([be84189](https://github.com/ksalzke/defer-tag-omnifocus-plugin/commit/be841894830961afaeee3ce4f9c288ed58ca1631))



# [3.1.0](https://github.com/ksalzke/defer-tag-omnifocus-plugin/compare/v3.0.0...v3.1.0) (2021-11-19)


### Features

* fix version path for ci and force update ([4c41097](https://github.com/ksalzke/defer-tag-omnifocus-plugin/commit/4c4109773a1fc63f06ba009e20e381f51eade6e8))
* restructure to improve ease of installation ([4d69297](https://github.com/ksalzke/defer-tag-omnifocus-plugin/commit/4d69297279b3f9cc508f57ae09da588f5745be70))



# [3.0.0](https://github.com/ksalzke/defer-tag-omnifocus-plugin/compare/v2.4.0...v3.0.0) (2021-10-18)


* Use dropped folder for storage of scheduler tasks (#3) ([8916bc9](https://github.com/ksalzke/defer-tag-omnifocus-plugin/commit/8916bc94adbebed99c598b5cbfb78904f02b5d00)), closes [#3](https://github.com/ksalzke/defer-tag-omnifocus-plugin/issues/3)


### BREAKING CHANGES

* Previously project matching 'Tag Scheduling' was used to store scheduler tasks.
These are now stored in a '🏷 Tag Scheduling' project inside a dropped folder of same name.
The project is created automatically when needed.
This avoids cluttering other views but existing deferred tags may need to be moved manually.



# [2.4.0](https://github.com/ksalzke/defer-tag-omnifocus-plugin/compare/7ef63199c924928fbbfa2161619157f5d7beac87...v2.4.0) (2021-10-17)


### Features

* add SF symbols ([7ef6319](https://github.com/ksalzke/defer-tag-omnifocus-plugin/commit/7ef63199c924928fbbfa2161619157f5d7beac87))



