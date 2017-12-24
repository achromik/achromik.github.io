$(function(){

$('#list').find('li').mouseover(function(){
    $(this).parent('ol').find('li').find('div').removeClass('active');
    $(this).parent('ol').find('li').removeClass('active-item');
    $(this).addClass('active-item');
    $(this).find('div').addClass('active');
});

});