var Browser = Laya.Browser;
var WebGL = Laya.WebGL;
var Loader = Laya.Loader;
var Stat = Laya.Stat;

var MOVE_SENSITIVITY = 2;
var GYE_SENSITIVITY_X = 27;
var GYE_SENSITIVITY_Y = 5;

var SCALE_SENSITIVITY_BG = 0.0001;
var PARALLAX_SENSITIVITY_PART1 = 0.1;
var PARALLAX_SENSITIVITY_PART2 = 0.2;
var PARALLAX_SENSITIVITY_PART3 = 0.3;

var BgPageX = 0, WindowW = 0;

var dialogData = {
    bell:{
        bg:"bell/1.png",
        key:"bell",
        nums:2
    },
    conch1:{
        bg:"conch/1.png"
    },
    conch2:{
        bg:"conch/2.png",
        key:"conch",
        nums:2
    },
    conch3:{
        bg:"conch/3.png"
    },
    conch4:{
        bg:"conch/4.png"
    },
    conch5:{
        bg:"conch/5.png"
    },
    drug:{
        bg:"drug/1.png"
    },
    farm:{
        bg:"farm/1.png",
        word: "farmWord",
    },
    king:{
        bg:"king/1.png",
        key:"king",
        nums:4,
        word: "kingWord",
    },
    product:{
        bg:"product/1.png"
    },
    sea2:{
        bg:"sea2/1.png",
        key:"sea2",
        nums:3,
        word: "sea2Word"
    },
    seabed:{
        bg:"seabed/1.png",
        word: "seabedWord"
    },
    ship:{
        bg:"ship/1.png",
        key:"ship",
        nums:3
    },
    wall:{
        bg:"wall/1.png"
    },
    YJY:{
        bg:"YJY/1.png"
    }
}