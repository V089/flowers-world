import RangeSliderPips from "https://cdn.skypack.dev/svelte-range-slider-pips@2.2.2";

let vals = [3000, 7000];
let timer;

const $slider1 = document.getElementById("slider1");

const currency = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "Rub",
  maximumFractionDigits: 0,
});

const formatter = (value) => currency.format(value);

const stop = () => {
  const $slider1 = document.querySelector("#PriceGradient");
  $slider1.classList.remove("up", "down");
};

const slide = (e) => {
  const $slider1 = document.querySelector("#PriceGradient");
  const delta = -(e.detail.previousValue - e.detail.value);
  if (delta > 0) {
    $slider1.classList.add("up");
    $slider1.classList.remove("down");
  } else {
    $slider1.classList.add("down");
    $slider1.classList.remove("up");
  }
  clearTimeout(timer);
  timer = setTimeout(stop, 66);
};

const slider1 = new RangeSliderPips({
  target: $slider1,
  props: {
    id: "PriceGradient",
    min: 100,
    max: 30000,
    values: vals,
    pips: true,
    range: true,
    pipstep: 200,
    first: false,
    last: false,
    float: true,
    formatter: formatter,
  },
});

slider1.$on("change", slide);
slider1.$on("stop", stop);

setTimeout(() => {
  document.querySelector("#PriceGradient .rangeHandle").focus();
}, 1000);
