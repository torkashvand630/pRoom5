function is_touch_device1() {
    return 'ontouchstart' in window;
}
if (is_touch_device1()) {
    $('.toolbarHide').hide();

   // console.warn("bbbbbbbbbbbbbbb ontouchstart" + is_touch_device1());

}
//console.warn("bbbbbbbbbbbbbbb ontouchstart" + is_touch_device1());