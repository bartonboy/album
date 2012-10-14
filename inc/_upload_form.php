<!-- #upload-form (start) -->
<div id="upload-form" class="mod-form">
    <div class="mod-content">
        <div class="hd">
            <h1>上傳表單</h1>
        </div>
        <div class="bd">
            <p>請選取檔案即可將電腦中的照片上傳至此喔！</p>
            <form method="post" action="http://f2eclass.com/service/?method=upload" enctype="multipart/form-data">
                <div class="row row-main">
                    <label for="file">檔案</label>
                    <input type="file" name="file" id="file">
                </div>
                <div class="row">
                    <label>標題</label>
                    <input type="text" name="title" value="" placeholder="請輸入照片標題">
                </div>
                <div class="row">
                    <label>描述</label>
                    <textarea name="description" value="" placeholder="請輸入照片描述"></textarea>
                </div>
                <div class="row">
                    <label>標籤</label>
                    <input type="text" name="tags" value="" placeholder="請輸入相關標籤（以逗號分隔）">
                </div>
                <div class="row row-button">
                    <input type="submit" value="將電腦裡的照片上傳到分享區" class="yui3-button">
                </div>
            </form>
        </div>
    </div>
</div>
<!-- #upload-form (end) -->
