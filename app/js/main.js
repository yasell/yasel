$(document).ready(function($) {

	$("#preloader_inner").fadeOut();
	// $("#preloader").delay(3000).fadeOut("slow");

	// - mobile menu
	$body = $("body");
	$menuTrigger = $("#menu__trigger");
	$menuLink = $(".header__menu-list a");

	$menuTrigger.on("click", function() {
		if ($body.hasClass("menu__open")) {
			$body.removeClass("menu__open");
			$(this).removeClass("active__mod");
		} else {
			$body.addClass("menu__open");
			$(this).addClass("active__mod");
		}
	});

	$menuLink.on("click", function() {
		if ($body.hasClass("menu__open")) {
			$body.removeClass("menu__open");
			$menuTrigger.removeClass("active__mod");
		}
	});

	// - back to top
	$(".back-top").hide();

	$(window).scroll(function() {
		if ($(this).scrollTop() > 50) {
			$(".back-top").fadeIn();
			$(".header").addClass("header--color");
		} else {
			$(".back-top").fadeOut();
			$(".header").removeClass("header--color");
		}
	});

	$(".back-top").click(function() {
		$("body,html").animate({
			scrollTop: 0
		}, 500);
		return false;
	});

	// modal window
	// open
	$("#modal").click(function() {
		$("#modal_window").addClass("modal--show");
		$(".page-wrapper").addClass("modal-blur");
		$(".modal-bg").css("display", "block");
	});

	// close
	$(".modal__close, .modal-bg").click(function() {
		$("#modal_window").removeClass("modal--show");
		$(".page-wrapper").removeClass("modal-blur");
		$(".modal-bg").css("display", "none");
	});

	// send modal
	$("#modal_window .form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			// open modal
			$("#modal_call, #modal_call2").removeClass("modal_show");
			$("#modal_sucsess").addClass("modal_show");
			$(".modal_bg").css("display", "block");

			$(".modal__close, .modal_bg").click(function() {
				$("#modal_sucsess").removeClass("modal_show");
				$(".modal_bg").css("display", "none");
			});
			$(".form").trigger("reset");
		});
		return false;
	});

});
