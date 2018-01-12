$(function(){
    let qipan = $('.qipan'),
        flag = true,
        hei = {},
        bai = {},
        blank = {},
        ai = true;
    let p = $('p')[0];
    let p1 = $('p')[1];
    for(let i =0;i < 15;i++){
        $('<i>').appendTo(qipan);
        $('<b>').appendTo(qipan);
        for(let j =0;j<15;j++){
            blank[i+"_"+j] = true;
            $('<span>').appendTo(qipan).addClass('qizi').attr('id',i+"_"+j).data('pos',{x:i,y:j});
        }
    }

    qipan.on('click','.qizi',function(){
        if($(this).hasClass('hei')||$(this).hasClass('bai')){
            return;
        }
        let data = $(this).data('pos');
        delete blank[data.x+"_"+data.y];
        if(flag){
            $(this).addClass('hei');
            hei[data.x+"_"+data.y]= true;
            if(isSuccess(data,hei)===5){
                qipan.off();
                console.log('黑方胜利');
            }
            if(ai){
                let pos = position();
                $('#' + pos.x+"_"+pos.y).addClass('bai');
                bai[pos.x+"_"+pos.y] = true;
                delete blank[pos.x+"_"+pos.y];
                if(isSuccess(pos,bai)===5){
                    qipan.off();
                    console.log('白方胜利');
                }
                return;
            }
        }else{
            $(this).addClass('bai');
            bai[data.x+"_"+data.y] = true;
            if(isSuccess(data,bai)===5){
                qipan.off();
                console.log('白方胜利');
            }
        }
        flag=!flag;
    });

    // 位置
    function position(){
        let score1 = 0,score2 = 0,pos1 = null,pos2 = null;
        for(let i in blank){
            let obj = {x:i.split('_')[0],y:i.split('_')[1]};
            if(isSuccess(obj,hei) > score1){
                score1 = isSuccess(obj,hei);
                 pos1 = obj;
            }
            if(isSuccess(obj,bai) > score2){
                score2 = isSuccess(obj,bai);
                 pos2 = obj;
            }
        }
        return score1 >score2?pos1:pos2;
    }
    function isSuccess(data,colorObj){
        let h=1,s=1,zx=1,yx=1;
        let x=data.x,y=data.y;

        while (colorObj[x+'_'+(++y)]){
            h++;
        }
        x=data.x,y=data.y;
        while (colorObj[x+'_'+(--y)]){
            h++;
        }
        x=data.x,y=data.y;
        while (colorObj[(++x)+'_'+y]){
            s++;
        }
        x=data.x,y=data.y;
        while (colorObj[(--x)+'_'+y]){
            s++;
        }
        x=data.x,y=data.y;
        while (colorObj[(++x)+'_'+(++y)]){
            yx++;
        }
        x=data.x,y=data.y;
        while (colorObj[(--x)+'_'+(--y)]){
            zx++;
        }
        x=data.x,y=data.y;
        while (colorObj[(++x)+'_'+(--y)]){
            yx++;
        }
        x=data.x,y=data.y;
        while (colorObj[(--x)+'_'+(++y)]){
            zx++;
        }
        return Math.max(h,s,zx,yx);
}

    let start = $('.start');
    let left = $('.left');
    p.addEventListener('click',function(){
        qipan.css({display:'block'});
        ai = false;
        left.css({display:'none'});

    })

    p1.addEventListener('click',function(){
        qipan.css({display:'block'});
        ai = true;
        left.css({display:'none'});
    })
    start.on('click',function(){
        left.css({display:'block'});
        start.css({display:'none'});
    })
});