<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>F2E 照片分享區</title>
<link rel="stylesheet" href="http://yui.yahooapis.com/2.8.0r4/build/reset-fonts-grids/reset-fonts-grids.css" type="text/css">
<link rel="stylesheet" href="http://yui.yahooapis.com/3.7.2/build/cssbutton/cssbutton.css">
<link rel="stylesheet" href="stylesheets/album.css">
</head>
<body class="yui3-skin-sam">
    <div id="doc3" class="yui-t3">
        <div id="hd" role="banner">
<?php include_once "inc/_masthead.php"; ?>
       </div><!-- #hd (end) -->
       <div id="bd" role="main">
            <div id="yui-main">
                <div class="yui-b">
<?php include_once "inc/_list.php"; ?>
                </div><!-- .yui-b (end) -->
            </div><!-- #yui-main (end) -->
            <div class="yui-b">
<?php include_once "inc/_save_form.php"; ?>
<?php include_once "inc/_upload_form.php"; ?>
            </div><!-- .yui-b (end) -->
        </div><!-- #bd (end) -->
        <div id="ft" role="contentinfo">
            <p></p>
        </div>
    </div>
    <script type="text/javascript" src="http://yui.yahooapis.com/3.7.2/build/yui/yui-min.js"></script>
    <script src="node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js"></script>
    <script type="text/javascript" src="javascript/module/module-manager.js"></script>
    <script type="text/javascript" src="javascript/module/module.js"></script>
    <script type="text/javascript" src="javascript/album.js"></script>
</body>
</html>
