$(document).ready(function(){
	$('.tab_btn li').click(function(){
		var tabindex = $(this).index();
		console.log(tabindex);
		$('.tab_btn li.on, .tab_content > div.on').removeClass('on');
		$(this).addClass('on');
		$('.tab_content > div').eq(tabindex).addClass('on');
	});

	$('.find_id_select > span > input').change(function(){
		if($('.find_id_select > span > input').is(':checked')){
			var spanindex = $(this).parents('span').index();
			$('.find_id_content > div.on').removeClass('on');
			$('.find_id_content > div').eq(spanindex).addClass('on');
		}
	});
	
});