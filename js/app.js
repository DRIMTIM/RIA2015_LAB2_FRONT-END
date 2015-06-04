 		/* Copyright (c) 2006 Mathias Bank (http://www.mathias-bank.de)
 		* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 		* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 		* 
 		* Thanks to Hinnerk Ruemenapf - http://hinnerk.ruemenapf.de/ for bug reporting and fixing.
 		*/
		jQuery.extend({
		/**
		* Returns get parameters.
		*
		* If the desired param does not exist, null will be returned
		*
		* @example value = $.getURLParam("paramName");
		*/ 
 			getURLParam: function(strParamName){
				var strReturn = "";
				var strHref = window.location.href;
				var bFound=false;
				  
				var cmpstring = strParamName + "=";
				var cmplen = cmpstring.length;

				if ( strHref.indexOf("?") > -1 ){
				  	var strQueryString = strHref.substr(strHref.indexOf("?")+1);
				    var aQueryString = strQueryString.split("&");
				    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
				      	if (aQueryString[iParam].substr(0,cmplen)==cmpstring){
				        	var aParam = aQueryString[iParam].split("=");
				        	strReturn = aParam[1];
				        	bFound=true;
				        	break;
				      	}
				      
				    }
				}
				if (bFound==false) return null;
					return strReturn;
				}
			});

		var imagenCargada = null;
		var imagenesCargadas = new Array();	
		var active = false;

   		$('[data-toggle="tooltip"]').tooltip();

		var nombreUsuario = $.getURLParam("nombreUsu");
		if(nombreUsuario != null && nombreUsuario != ""){ 
			var aux = '&nbsp;' + nombreUsuario.replace(/\+/g, " ");
			$("#nombreUsu").html(aux);
		}else{
			$("#nombreUsu").html(" Registrese!");	
		}

		$("#formVer").hide();

		function mostrarImagen2(input) {
 			if (input.files && input.files[0]) {
  				var reader = new FileReader();
  				reader.onload = function (e) {
   					$('#miniatura').attr('src', e.target.result);
   					imagenCargada = e.target.result;
  				}
  				reader.readAsDataURL(input.files[0]);
 			}
		}

		function mostrarImagen(titulo, imagen, descripcion){
			bootbox.dialog({
			  message: "<div><img src='" + imagen + "' class='imagenDetalle'/><h4>" + descripcion + "</h4></div>",
			  title: titulo,
			  buttons: {
		    	aceptar: {
		    		label: "Cerrar",
		      		className: "btn-primary",
		      		callback: function() {}
		    	}
			  }
			});
		}

		function mostrarImagen3(titulo, imagen, descripcion){
			modal({
				type: 'inverted', //Type of Modal Box (alert | confirm | prompt | success | warning | error | info 
					//| inverted | primary)
				title: titulo, //Modal Title
				text: "<div><img src='" + imagen + "' class='img-thumbnail' width='900' height='750'/><h4>" 
												+ descripcion + "</h4></div>", //Modal HTML Content
				size: 'normal', //Modal Size (normal | large | small)
				/*buttons: [{
					text: 'Aceptar', //Button Text
					val: 'ok', //Button Value
					eKey: true, //Enter Keypress
					addClass: 'btn-light-blue', //Button Classes (btn-large | btn-small | btn-green | btn-light-green 
					//| btn-purple | btn-orange | btn-pink | btn-turquoise | btn-blue | btn-light-blue | btn-light-red 
					//| btn-red | btn-yellow | btn-white | btn-black | btn-rounded | btn-circle | btn-square | btn-disabled)

					onClick: function(argument) {
						console.log(argument);
						testing();
					}
				}, ],*/
				center: true, //Center Modal Box?
				autoclose: false, //Auto Close Modal Box?
				callback: null, //Callback Function after close Modal (ex: function(result){alert(result);})
				onShow: function(r) {}, //After show Modal function
				closeClick: true, //Close Modal on click near the box
				closable: true, //If Modal is closable
				theme: 'atlant', //Modal Custom Theme
				animate: false, //Slide animation
				background: 'rgba(0,0,0,0.35)', //Background Color, it can be null
				zIndex: 1050, //z-index
				/*buttonText: {
					ok: 'Aceptar',
					yes: 'Yes',
					cancel: 'Cancel'
				},*/
				template: '<div class="modal-box"><div class="modal-inner"><div class="modal-title">' +
							'<a class="modal-close-btn"></a></div><div class="modal-text"></div>' +
							'<div class="modal-buttons"></div></div></div>',
				_classes: {
					box: '.modal-box',
					boxInner: ".modal-inner",
					title: '.modal-title',
					content: '.modal-text',
					buttons: '.modal-buttons',
					closebtn: '.modal-close-btn'
				}
			});
		}

		function cargarImagen(event) {
			var files = event.target.files;
			var reader = new FileReader();
			var miniatura = document.getElementById("miniatura");
			for (var i = 0, file; file = files[i]; i++) {
				miniatura.title = file.name;
				reader.onload = function(event) {
					miniatura.src = event.target.result;
					imagenCargada = event.target.result;
				};
				reader.readAsDataURL(file);
			}
		}	

		function mostrarFuncionalidad(funcionalidad) {
			if (funcionalidad == "INGRESAR") {
				$("#formIngresar").show();
				$("#formVer").hide();
				$("#linkIngresar").attr("class", "active");
				$("#linkVer").attr("class", "");
				$("#vistaBtns").hide();
				$('#listaImgs').hide();
			} else {
				$("#formIngresar").hide();
				$("#formVer").show();
				if(imagenesCargadas.length > 0){
					$("#vistaBtns").show();	
				}
				$("#linkIngresar").attr("class", "");
				$("#linkVer").attr("class", "active");
				mostrarImagenesCargadas();
			}

		}

		function cargarItemListaImagenes(indice, titulo, imagen, descripcion){

			var lista = "";
			itemLista = "<li id='itemList_" + indice + "' class='list-group-item' >" +
								"<div class='panel-group' >" +
									"<div id='itemListImg_" + indice + "' style='display: inline;'>" + 	
										"<img id='itemImg_" + indice + "'" +
										"src='" + imagen + "' class='img-thumbnail imagen' >" +
									"</div>" +
									"<div id='itemListData_" + indice + "' style='display: inline;'>" + 
										"<h3 style='display: inline;'> " + titulo + " </h3>" +
										"<p style='display: inline;'> { " + descripcion + " } </p>" +
									"</div>" +
								"</div>" +		
							"</li>";

			$('#listaImagenes').append(itemLista);			

			var obj = $("#itemImg_" + indice);
			obj.on("click", {titulo : titulo, imagen : imagen, descripcion: descripcion}, function(event) {
				mostrarImagen3(event.data.titulo,event.data.imagen,event.data.descripcion);
			});

		}

		function mostrarImagenesCargadas(){

			$("#myCarousel").show();
			$(".carousel-inner").html(null);
			$('.carousel-indicators').html(null);
			$('#listaImagenes').html(null);

			if(imagenesCargadas.length > 0){
				$("#sinImagenes").hide();
				var indicator = "";
				var item = "";

				for(var i = 0; i < imagenesCargadas.length; i++){
					var titulo = imagenesCargadas[i].titulo;
					var imagen = imagenesCargadas[i].archivo;
					var descripcion = imagenesCargadas[i].descripcion;

					if(i == 0){
						item = "<div class='item active'>" +
						        "<img id='item_" + i + "'" + "class='img-rounded img-thumbnail' src='" + imagen 
						        + "'" + "alt='" + titulo + "'" 
						        + "width='500' height='350'>" + "<div class='carousel-caption'>" +
						        	"<h3>" + titulo + "</h3>" + 
						        	"<p>" + descripcion + "</p>" +
						        "</div>" +
						    "</div>";

						indicator = "<li data-target='#myCarousel' data-slide-to='" + i + "'" + "class='active'></li>";

					}else{

						item = "<div class='item'>" +
						        "<img id='item_" + i + "'" + "class='img-rounded img-thumbnail' src='" + imagen + "'" 
						        + "alt='" + titulo + "'" 
						        + "width='500' height='350'>" + "<div class='carousel-caption'>" +
						        	"<h3>" + titulo + "</h3>" + 
						        	"<p>" + descripcion + "</p>" +
						        "</div>" +
						    "</div>";

						indicator = "<li data-target='#myCarousel' data-slide-to='" + i + "'" + "></li>";

					}		

					cargarItemListaImagenes(i, titulo, imagen, descripcion);

					$('.carousel-indicators').append(indicator);
					$('.carousel-inner').append(item);

					item = null;				

				}
			}else{
				$("#sinImagenes").show();
				$("#myCarousel").hide();
			}
		}	
		
		function mostrarConfirmacion(titulo, mensaje, funcionAceptar){
			bootbox.dialog({
			  message: mensaje,
			  title: titulo,
			  buttons: {
			  	cancelar: {
				  label: "Cancelar",
			      className: "btn-primary",
			      callback: function() {}
		    	},
		    	aceptar: {
		    		label: "Aceptar",
		      		className: "btn-primary",
		      		callback: function() {
		        		funcionAceptar();
		      		}
		    	}
			  }
			});
		}

		function mostrarError(mensaje){
			bootbox.dialog({
			  message: mensaje,
			  title: "Error!",
			  buttons: {
		    	aceptar: {
		    		label: "Cerrar",
		      		className: "btn-primary",
		      		callback: function() {}
		    	}
			  }
			});
		}

		function guardarImagen(){
			var tituloImagen = $("#tituloImagen").val();
			var descripcionImagen = $("#descripcionImagen").val();
			if(imagenCargada != null && imagenCargada != "" && imagenCargada != undefined){
				if(tituloImagen != null && tituloImagen != "" && tituloImagen != undefined){
					if(descripcionImagen != null && descripcionImagen != "" && descripcionImagen != undefined){
						mostrarConfirmacion("Confirmación", "Esta seguro que desea guardar la imagen?", function (){
							var imagen = new Object();
							imagen.archivo = imagenCargada;
							imagen.titulo = tituloImagen;
							imagen.descripcion = descripcionImagen;
							imagenesCargadas[imagenesCargadas.length] = imagen;
							limpiarCampos();
						});
					}else{
						mostrarError("Debe ingresar una descripción!");
					}
				}else{
					mostrarError("Debe ingresar un titulo!");
				}
			}else{
				mostrarError("Debe seleccionar una imagen!");
			}		
		}		

		function limpiarCampos(){
			$("#archivoImagen").val(null);
			$("#tituloImagen").val(null);
			$("#descripcionImagen").val(null);
			$("#miniatura").attr("src", "../images/upload.png");
			$(":file").filestyle('clear');
		}
 
		/*$("#archivoImagen").change(function(){
 			cargarImagen(event);
		});*/

		$("#btnSubirImg").click(function(){
			guardarImagen();
 		});	

 		function aleatorio(inferior,superior){
    		var numPosibilidades = superior - inferior;
    		var aleat = Math.random() * numPosibilidades;
    		aleat = Math.round(aleat);
    		return parseInt(inferior) + aleat;
		};


		$('#listaView').click(function(){

			$("#myCarousel").hide();
			$("#listaImgs").show();

		});

		$('#carouselView').click(function(){

			$("#myCarousel").show();
			$("#listaImgs").hide();

		});		