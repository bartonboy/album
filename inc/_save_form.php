<!-- #save-form (start) -->
<div id="save-form" class="mod-form">
    <div class="mod-content">
        <div class="hd">
            <h1>存檔表單</h1>
        </div>
        <div class="bd">
            <p>請輸入網址即可將照片儲存至此喔！</p>
            <form method="post" action="/service/?method=saveURL">
                <div class="row">
                    <label>網址</label>
                    <input type="text" name="url" value="" placeholder="請輸入圖檔網址">
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
                    <input type="submit" value="將此 URL 的照片轉貼到分享區" class="yui3-button">
                </div>
            </form>
        </div>
    </div>
</div>
<!-- #save-form (end) -->
