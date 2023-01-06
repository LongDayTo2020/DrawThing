let index = Vue.createApp({
    data() {
        return {
            isAddLock: false,
            addName: '',
            hopeList: [],
            isFinal: false
        }
    },
    //DOM全載完 執行
    mounted() {
        Swal.fire('歡迎來到~ \n 小小抽籤網頁!');
    },
    //方法
    methods: {
        addHope: function () {
            if ((this.addName || '') === '')
                return Swal.fire('請填寫願望名稱喔~');
            if (this.isAddLock)
                return Swal.fire('目前已鎖定');
            let newHope = {
                name: this.addName,
                vueKey: newUUID(),
                class:''
            };
            this.hopeList.push(newHope);
            this.addName = '';
        },
        removeHope: function (name, key) {
            if (this.isAddLock)
                return Swal.fire('目前已鎖定');
            Confirm(`確定刪除${name}?`).then(resp => {
                //已取消
                if (resp.isDismissed) return false;
                this.hopeList = this.hopeList.filter(x => x.vueKey !== key);
            });
        },
        clearHopeList: function () {
            if (this.isAddLock)
                return Swal.fire('目前已鎖定');
            Confirm('確定清空願望清單?').then(resp => {
                //已取消
                if (resp.isDismissed) return false;
                this.isAddLock = false;
                this.addName = '';
                this.hopeList = [];
            });
        },
        lockHopeList: function () {
            if (this.isAddLock)
                return Swal.fire('目前已鎖定');
            Confirm('確定鎖定願望清單?').then(resp => {
                //已取消
                if (resp.isDismissed) return false;
                this.isAddLock = true;
            });
        },
        cancelLockHopeList: function () {
            this.isAddLock = false;
        },
        drawHopeList: function () {
            if (!this.isAddLock)
                return Swal.fire('請先確定願望清單!');
            if (this.isFinal)
                return Swal.fire('已經找到命中注定的願望囉!');
            Confirm('開始找尋命中注定的願望囉~').then(resp => {
                //已取消
                if (resp.isDismissed) return false;
                let result = randomData(this.hopeList);
                showResult('恭喜竟然抽到~\n'+result.name);
                let a = this.hopeList.find(x => x.vueKey === result.vueKey);
                a.class = 'table-warning';
                this.isFinal = true;
            });
        },
    }
}).mount('#m-div-main');

function newUUID() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function Confirm(title, text = '') {
    return Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消'
    });
}


function randomData(hopeList) {
    let x = Math.floor(Math.random() * hopeList.length);
    return hopeList[x];
}


function showResult(text) {
    Swal.fire({
        title: text,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}