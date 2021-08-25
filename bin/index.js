#!/usr/bin/env node
"use strict";

const yargs = require("yargs");
const sharp = require("sharp");
const { argv } = require("yargs");

const options = yargs
  .usage("Usage: $0 <input> <width> [aspect|height] <output>")
  .option("w", {
    alias: "width",
    desc: "image width",
    demandOption: true,
    number: true,
  })
  .option("h", {
    alias: "height",
    desc: "image height",
    demandOption: false,
    number: true,
  })
  .option("a", {
    alias: "aspect",
    desc: "aspect ratio",
    demandOption: false,
    array: true,
    type: "array",
  })
  .option("i", {
    alias: "input",
    desc: "Input image file path",
    demandOption: true,
  })
  .option("o", {
    alias: "output",
    desc: "Output image file path",
    demandOption: true,
  }).argv;

const sharpOptions = {
  width: options.w,
  input: options.i,
  output: options.o,
};

if (options.h) {
  sharpOptions.height = options.h;
} else if (options.a) {
  sharpOptions.height = Math.floor((options.w * options.a[1]) / options.a[0]);
}

console.log(sharpOptions);

sharp(options.i)
  .resize(sharpOptions.width, sharpOptions.height)
  .toFile(options.o);
