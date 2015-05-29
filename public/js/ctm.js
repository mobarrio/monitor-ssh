    //var equipos=JSON.parse('<%-JSON.stringify(equipos)%>');
    var nequipos=0; for(var i in equipos){ ++nequipos; }
    var ciclo = 0;
    var socket = io(':3000');
    var old_arrow_idx = null;
    socket.on('update', function (data) {
        ciclo++;
        ciclo = ciclo % nequipos;
        $("#ciclo").html(nequipos-ciclo);
        var reorder = false;
        var memusage = ((parseFloat(data.memfree)+parseFloat(data.cached))/parseFloat(data.memtotal)).toFixed(2);
        var cpuusage = parseFloat(data.cpuusage).toFixed(2);
        var appcpuusage = parseFloat(data.appcpu).toFixed(2);
        var appmemusage = parseFloat(data.appmem).toFixed(2);
        var id = data.ipaddr.toString().replace(/\./g,"-");

        $(".cpu-bt-"+id).html(cpuusage+"%");
        $(".mem-bt-"+id).html(memusage+"%");
        $(".rootfs-"+id).html(data.rootfsusage);
        $(".load1-"+id).html(data.load1);
        $(".load5-"+id).html(data.load5);
        $(".load15-"+id).html(data.load15);
        $(".cpu-app-"+id).html(appcpuusage+"%");
        $(".mem-app-"+id).html(appmemusage+"%");

        /* Depurar clases antiguas */
        $(".rootfs-"+id).removeClass("bg-r bg-a bg-v");
        $(".cpu-bt-"+id).removeClass("bg-r bg-a bg-v");
        $(".mem-bt-"+id).removeClass("bg-r bg-a bg-v");
        $(".cpu-app-"+id).removeClass("bg-r bg-a bg-v");
        $(".mem-app-"+id).removeClass("bg-r bg-a bg-v");
        $(".ppmemusage"+id).removeClass("bg-r bg-a bg-v");
        $(old_arrow_idx).removeClass("red-tr");
        $(".tr-"+id).addClass('red-tr');

        /* Pinta RootFSUsage*/
        if(parseFloat(data.rootfsusage) >= 95){  $(".rootfs-"+id).addClass("bg-r"); reorder = true; }
        else if(parseFloat(data.rootfsusage) >= 90) { $(".rootfs-"+id).addClass("bg-a"); reorder = true; }
        else $(".rootfs-"+id).addClass("bg-v");

        /* Pinta CPUUsage*/
        if(cpuusage >= 90){ $(".cpu-bt-"+id).addClass("bg-r"); reorder = true; }
        else if(cpuusage >= 50){ $(".cpu-bt-"+id).addClass("bg-a"); reorder = true; }
        else $(".cpu-bt-"+id).addClass("bg-v");

        /* Pinta MEMUsage*/
        if(memusage >= 80){ $(".mem-bt-"+id).addClass("bg-r"); reorder = true; }
        else if(memusage >= 50){ $(".mem-bt-"+id).addClass("bg-a"); reorder = true; }
        else $(".mem-bt-"+id).addClass("bg-v");

        /* Pinta MEMUsage*/
        if(appcpuusage >= 80){ $(".cpu-app-"+id).addClass("bg-r"); reorder = true; }
        else if(appcpuusage >= 50){ $(".cpu-app-"+id).addClass("bg-a"); reorder = true; }
        else $(".cpu-app-"+id).addClass("bg-v");

        /* Pinta MEMUsage*/
        if(appmemusage >= 80){ $(".mem-app-"+id).addClass("bg-r"); reorder = true; }
        else if(appmemusage >= 50){ $(".mem-app-"+id).addClass("bg-a"); reorder = true; }
        else $(".mem-app-"+id).addClass("bg-v");

        /* Inserta al principio de la tabla */
        if(reorder){
            var $tr = $(".tr-"+id).clone();
            $(".tr-"+id).remove();
            $tr.insertBefore('table > tbody > tr:first');
        } 
        old_arrow_idx = ".tr-"+id;
    });

    $(document).ready(function(){
      $.each(equipos, function(i, val) {
        var id = i.toString().replace(/\./g,"-");
        $(".tbody").append('<tr class="tr-'+id+'">' +
            '  <td class="ip-'+id+'" title="'+equipos[i].vname+'">'+i+'</td>' +
            '  <td class="tipo-'+id+'">'+equipos[i].tipo+'</td>' +
            '  <td class="estacion-'+id+'">'+equipos[i].estacion+'</td>' +
            '  <td class="rootfs-'+id+' text-center">-</td>' +
            '  <td class="text-center">' +
            '    <div class="container-fluid">' +
            '      <div class="row">' +
            '        <div class="col-md-6 col-xs-6 cpu-bt-'+id+' text-center">-</div> ' +
            '        <div class="col-md-6 col-xs-6 mem-bt-'+id+' text-center">-</div> ' +
            '      </div>' +
            '    </div>' +
            '  </td>' +
            '  <td class="text-center">' +
            '    <div class="container-fluid">' +
            '      <div class="row">' +
            '        <div class="col-md-6 col-xs-6 cpu-app-'+id+' text-center">-</div> ' +
            '        <div class="col-md-6 col-xs-6 mem-app-'+id+' text-center">-</div> ' +
            '      </div>' +
            '    </div>' +
            '  </td>' +
            '  <td class="text-center">' +
            '    <div class="container-fluid">' +
            '      <div class="row">' +
            '        <div class="col-md-4 col-xs-4 load1-'+id+'"  text-center">-</div> ' +
            '        <div class="col-md-4 col-xs-4 load5-'+id+'"  text-center">-</div> ' +
            '        <div class="col-md-4 col-xs-4 load15-'+id+'" text-center">-</div> ' +
            '      </div>' +
            '    </div>' +
            '  </td>' +
            '</tr>');
      });
    });    