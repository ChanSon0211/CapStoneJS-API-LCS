function DanhSachSanPham(){
    this.arr = [];
    this.themSP = function (sp) {
        this.arr.push(sp);
      };
      this.TimViTriSP = function (accountInfo) {
        /**
         * Tìm vị trí
         * - Tạo 1 biến index = -1;
         * - Duyệt mảng arr, i
         * - Kiểm tra sv.maSV trùng maSV?
         * => True: Cập nhật index = i
         */
        var index = -1;
    
        this.arr.forEach(function (sv, i) {
          if (sv.accountInfo === accountInfo) {
            index = i;
          }
        });
    
        return index;
      };
    
      this._xoaSP = function (accountName) {
        var index = this.TimViTriSP(accountName);
    
        if (index !== -1) {
          this.arr.splice(index, 1);
        }
      };  
      this._capNhatSP = function (updateInfo){
        var index = this.TimViTriSP(updateInfo.accountName)
        if(index !== -1){
          this.arr[index] = updateInfo
        }
      }
}