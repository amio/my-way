workflow "Build and test on push" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "ci"
}

action "Build" {
  uses = "actions/npm@master"
  args = "run build"
  needs = ["Install"]
}

action "Test" {
  uses = "actions/npm@master"
  args = "test"
  needs = ["Build"]
}
