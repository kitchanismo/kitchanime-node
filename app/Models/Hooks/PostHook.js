"use strict";

const PostHook = (exports = module.exports = {});

PostHook.removePivot = async modelInstance => {
  modelInstance.map(m => {
    // delete m.pivot;
    // console.log(m.pivot);
    // return m.toJSON();
  });
};
