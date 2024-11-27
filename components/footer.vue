<script lang="ts" setup>
</script>
<template>
    <div class="footer">
        <div class="container">
            <div class="content">
                <div class="box">
                    <p>關於 虎禮選 tigerselect</p>
                    <p>Copyright © 2021 Tigerair Taiwan Limited.</p>
                    <p>本網站由台灣虎航股份有限公司版權所有,並委託飛買家股份有限公司營運
                        台北市中正區衡陽路51號13樓之3</p>
                    <p>13F-3, No.51, Hengyang Rd.,Zhongzheng Dist., Taipei 10045, Taiwan</p>
                </div>
                <div class="box rwd flex">
                    <div class="box">
                        <p>網站地圖</p>
                        <ul>
                            <li dense="">
                                <a class="link">所有商品</a>
                            </li>
                            <li dense="">
                                <a class="link">查詢訂單</a>
                            </li>
                            <li dense="">
                                <a class="link">隱私權政策</a>
                            </li>
                            <li dense="">
                                <a class="link">服務條款</a>
                            </li>
                            <li dense="">
                                <a class="link">常見問題</a>
                            </li>
                        </ul>
                    </div>
                    <div class="box">
                        <p>關注我們</p>
                    </div>
                </div>
            </div>
            <div>
                Copyright © 2021 Tigerair Taiwan Limited. | All rights Reserved.
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.footer {
    > .container {
        > .content {
            display: flex;

            @include mobile {
                flex-direction: column;
            }
        }
    }
    .rwd {
        @include mobile {
            display: block;
        }
    }
    .box {
        width: 50%;
        @include mobile {
            width: 100%;
        }
    }

}
</style>