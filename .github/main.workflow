workflow "Build and test on push" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "ci"
}

action "Test" {
  uses = "actions/npm@master"
  args = "test"
  needs = ["Install"]
  secrets = ["COVERALLS_REPO_TOKEN", "CODECOV_TOKEN"]
}
