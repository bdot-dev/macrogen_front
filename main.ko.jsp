<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/inc/taglib.jsp"%>
<head>
	<script src="/publishing/pc-ko/dist/js/lib/jquery-ui.min.js"></script>
	<script type="text/javascript" src="https://unpkg.com/youtube-background/jquery.youtube-background.min.js"></script>
</head>
<body>
<main class="wrap main-wrap">

    <section class="full-bg main-bg">

        <header class="header header-bg-white header-main" id="header">
			<c:import url="/inc/header-inner-gnb" />
        </header>
		<!-- 2023-04-27 스크립트내용 인클루드 파일로 이동 -->
		<h2 class="ir">정밀의학 생명공학기업 마크로젠은 개개인이 타고난 유전적 특성을 정확히 알고 보다 건강한 삶을 준비할 수 있도록 돕는 초개인화 헬스케어 서비스를 제공합니다.</h2>
		
		<!-- s intro -->
       <!--  <div class="intro">
            <div class="box">
                <p class="text" data-aos="fade-left" data-aos-duration="600" data-aos-delay="500">유전체 맞춤 의학으로</p>
                <p class="text" data-aos="fade-left" data-aos-duration="600" data-aos-delay="1000">
                    <img src="../../img/main/txt-intro.png" alt="78억 인류와 세상을 향합니다."></p>
            </div>
        </div> -->
		
		<!-- s 메인비주얼 영역 -->
       	<div class="swiper-container" id="key-swiper-container">
            <div class="swiper-wrapper" id="key-swiper-wrapper">
            
               	<c:forEach var="result" items="${ mainBannerList }" varStatus="status">     
	            	<c:if test="${result.expsrYn == 'Y'}">
		                <div class="swiper-slide">
		                	<c:choose>
		                		<c:when	test="${result.mediaUrlPc != null && result.mediaUrlPc != '' }">
			                		 <!-- <iframe class="visual" frameborder="0" height="100%" width="100%" src="${result.mediaUrlPc}" 
			                		 allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>			                		 
					                 </iframe>		
									  --> 
									 	<div id="ytbg" data-vbg="${result.mediaUrlPc}"></div>
					                 	<div class="text-box">
				                        	<h3 class="slogan-sub">${result.mainNttSjPc}</h3>
				                        	<h4 class="desc">${fn:replace(result.mainNttCnPc, newline, "<br/>")}</h4>
				                        	<c:choose>
				                        		<c:when test="${result.btYn != 0 && result.btYn == 1}">
						                       		<div class="btns">
						                            	<button type="button" onclick="location.href='${result.linkUrl1}'">${result.btSjPc1}</button>
						                        	</div>
				                        		</c:when>
				                        		<c:when test="${result.btYn != 0 && result.btYn == 2}">	                        	
						                        	<div class="btns">
						                            	<button type="button" onclick="location.href='${result.linkUrl1}' ">${result.btSjPc1}</button>
						                            	<button type="button" onclick="location.href='${result.linkUrl2}' ">${result.btSjPc2}</button>
						                        	</div>
				                        		</c:when>	                        
				                        	</c:choose>
				                    	</div>			            	
		                		</c:when>
		                		<c:otherwise>
					            	<div class="visual" style="background: url(${publicUrl}${result.imageFlpthPc}) no-repeat center center / cover"></div>
					            		<div class="text-box">
				                        	<h3 class="slogan-sub">${result.mainNttSjPc}</h3>
				                        	<h4 class="desc">${fn:replace(result.mainNttCnPc, newline, "<br/>")}</h4>
				                        	<c:choose>
				                        		<c:when test="${result.btYn != 0 && result.btYn == 1}">
						                       		<div class="btns">
						                            	<button type="button" onclick="location.href='${result.linkUrl1}'">${result.btSjPc1}</button>
						                        	</div>
				                        		</c:when>
				                        		<c:when test="${result.btYn != 0 && result.btYn == 2}">	                        	
						                        	<div class="btns">
						                            	<button type="button" onclick="location.href='${result.linkUrl1}' ">${result.btSjPc1}</button>
						                            	<button type="button" onclick="location.href='${result.linkUrl2}' ">${result.btSjPc2}</button>
						                        	</div>
				                        		</c:when>	                        
				                        	</c:choose>
				               			</div>
		                		</c:otherwise>
		                	</c:choose>		                			                	
		                   
		                </div>               	
	             	</c:if>
	             	
		           <div class="scroll-wrap">
		               <div class="scroll"><span class="bar" style="bottom: 0"></span></div>
		           </div>        
		                    
					<!-- If we need pagination -->
		  			<div class="swiper-pagination" id="key-swiper-pagination"></div>	
		  			        							
					<c:if test="${ result.expsrYn == 'Y' &&  mainBannerList.size() > 1 }">
						<!-- If we need navigation buttons -->
		           		<div class="swiper-button-prev swiper_btn"></div>
		            	<div class="swiper-button-next swiper_btn"></div>	  					
					</c:if>
               	</c:forEach>
               	
            </div>            
        </div> 
             	
        <script>
        
            var $container = $('#key-swiper-container');
            var $conLi = $container.find('.swiper-slide');
            var $wrapper = $('#key-swiper-wrapper');
            var $pagination = $('#key-swiper-pagination');
            var delay = 5000;
            var mainSwiper;
            setTimeout(function () {
                step1();
            })

            function step1() {
               $wrapper.css({
                   'transform': 'translateY(0)',
                   'transition-duration': '1s'
                })
                $('.bg-DNA').addClass('DNA-move')
                $wrapper.animate({
                    height: "100%"
                }, 1000, function () {
                    $('.swiper-wrapper').css({'overflow': 'visible'})
                    $pagination.show()
                    setSlider()

                    $('html').addClass('animated')
                })
            }

            function step2() {
                //after 기능
                $('.header')
                    .addClass('header-main')
                    .removeClass('header-bg-white')
                $wrapper.css({'overflow': 'visible'})
                $container.css({'overflow': 'hidden'})
                $('.text-box').fadeIn()
                $('.scroll-wrap').delay(1000).fadeIn()                
                $('.stock_information').delay(1500).fadeIn()
            }

            function setSlider() {                
                var conCnt = $conLi.length;
                let options = {};

                if (mainSwiper !== undefined) {
                    console.log('mainSwiper');
                    return false
                }
                console.log('setSlider');
                if(conCnt < 2){
                    console.log(conCnt);
                    options = {}         
                }else{
                    options = {
                        effect : 'fade', // 페이드 효과
                        loop: true, //반복
                        speed: 0,//속도
                        autoplay: {
                            delay: 6000,
                            waitForTransition: true,
                            disableOnInteraction: false,
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        pagination: {
                            el: $pagination,
                            clickable: true,

                            renderBullet: function (index, className) {
                                var bu = '<span class="' + className + '">' + '<svg class="fp-arc-loader" width="50" height="50">' +
                                '<circle class="path" cx="50%" cy="50%" r="23" fill="none"  stroke="#FFF"' +
                                'stroke-opacity="1" stroke-width="1px"></circle>' +
                                '<circle cx="50%" cy="50%" r="5" fill="#FFF"></circle>' +
                                '</svg></span>';
                            return bu;

                            },
                        },
                        on: {
                            slideChange: function () { 
                                var $slides = this.slides; 
                                $slides.children('.visual').css('animation', 'none'); 
                                $slides.eq(this.activeIndex).children('.visual').css({ 
                                    'animation-name': 'grow2', 
                                    'animation-duration': '1s' 
                                }) 
                            }, 
                        }
                    }   
                    $('.swiper_btn').delay(1000).fadeIn()     
                }

                mainSwiper = new Swiper($container, options)
                step2()
				
                jQuery('[data-vbg]').youtube_background();
            }
            
           	/* function mainGenTokBannerBtn() {
           		$('.swiper-slide .text-box .btns').find('button').each(function(i, v) {
           			if ($(v).attr('onclick') == "location.href='https://gentok.net/intro/intro.html ' " || $(v).attr('onclick') == "location.href='https://gentok.net/market' ") {
           				$(v).css('backgroundColor', '#dcdcdc');
           			}
           		});
           	}
           	mainGenTokBannerBtn(); */
        </script>
    </section>
        
		<!-- s Humanizing 영역 -->
	<section class="container container-fluid">
	    <div class="main-page company-define">
			<!-- s  바로가기 -->
			<article class="section-define">
				<div class="info-box">
					<h3 class="title">
						<span data-aos="fade-up" data-aos-duration="600">Humanizing</span>
						<span data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">Genomics</span>
					</h3>
					<div class="text-box">
						<h4 class="text">
							<p data-aos="fade-up" data-aos-duration="600" data-aos-delay="400">유전체 정보 및 데이터 분석 기술을 바탕으로
							</p>
							<p data-aos="fade-up" data-aos-duration="600" data-aos-delay="550">인류의 건강과 행복에 이바지합니다
							</p>
							<!-- <p data-aos="fade-up" data-aos-duration="600" data-aos-delay="700">생명공학기업 마크로젠 입니다</p> -->
						</h4>
						<a href="/${rc.locale.language }/company/overview" class="btn btn-text" data-aos="fade-up" data-aos-duration="900"
						   data-aos-delay="1000"><span>MORE</span><i class="icon icon-arrow-right-long"></i></a>
					</div>
				</div>
				<div class="shortcuts-box" data-aos="fade-up" data-aos-duration="500">
					<ul class="btn-list clearfix">
						<li>
							<a href="/${rc.locale.language }/company/overview">
								<p>기업개요</p>
								<p class="sub-text">유전체 분석 기반 글로벌 디지털 <br> 헬스케어 기업 마크로젠입니다</p><!--  People :2023리뉴얼 -->
								<p class="btn btn-circle btn-white btn-md"><i class="icon icon-arrow-right-short"></i>
								</p>
							</a>
						</li>
						<li>
							<a href="/${rc.locale.language }/company/global-network">
								<p>글로벌 마크로젠</p>
								<p class="sub-text">전세계 유전체 분석 연구를 이끄는 <br>글로벌 파트너와 함께 합니다</p><!--  People :2023리뉴얼 -->
								<p class="btn btn-circle btn-white btn-md"><i class="icon icon-arrow-right-short"></i>
								</p>
							</a>
						</li>
						<li>
							<a href="/${rc.locale.language }/company/esg-management">
								<p>ESG</p>
								<p class="sub-text">지속가능한 미래를 위해 노력합니다</p><!--  People :2023리뉴얼 -->
								<p class="btn btn-circle btn-white btn-md"><i class="icon icon-arrow-right-short"></i>
								</p>
							</a>
						</li>
					</ul>
					<div class="bg_section bg0"></div>

					<div class="bg_section bg1 active">
						<video class="video" autoplay muted loop>
							<source src="/publishing/pc-ko/dist/img/video/main_기업개요.mp4" type="video/mp4">
						</video>
					</div>
					<div class="bg_section bg2">
						<video class="video" autoplay muted loop>
							<source src="/publishing/pc-ko/dist/img/video/main_글로벌마크로젠.mp4" type="video/mp4">
						</video>
					</div>
					<div class="bg_section bg3">
						<video class="video" autoplay muted loop>
							<source src="/publishing/pc-ko/dist/img/video/main_ESG.mp4" type="video/mp4">
						</video>
					</div>
					<script>
						var currentIdx = 1;
						$('.shortcuts-box .btn-list li').mouseover(function () {
							var index = $(this).index() + 1;
							console.log(index)

							if (index !== currentIdx) {
								console.log('wun')
								$('.bg_section').eq(index).addClass('active')
									.siblings().removeClass('active')
								currentIdx = index
							}
							//
							$('.bg_section .video').filter(":not(:eq("+(index-1)+"))").each(function(){
								$(this).get(0).pause();
							})

							//$('.bg_section .video').play().currentTime()
							$('.bg_section .video').eq(index-1).get(0).play() //.currentTime()

						}).mouseout(function(){
							//$('.bg_section .video').pause()
						});
					</script>
				</div>
			</article>
			<!-- e  바로가기 -->
			<!-- s  business  slide -->
			<article class="section-business">
				<div class="info-box">
					<h3 class="title" data-aos="fade-up" data-aos-duration="500">Our Services</h3>
					<h4 class="desc">
						<p data-aos="fade-up" data-aos-duration="500" data-aos-delay="200">연구 분석에서 퍼스널 헬스케어까지 세계적 수준의 전문 서비스를 제공하여
							<br>더 건강하고 행복한 삶을 만들어갑니다</p><!--2023-04-17::마침표삭제--> <!--  People :2023리뉴얼 -->
					</h4>
				</div>
				<div class="business" data-aos="fade-left" data-aos-duration="500" data-aos-delay="200" >
					<div class="slider">	
						<div class="swiper-container _businessSlider">
							<div class="swiper-wrapper">
							
								<c:forEach var="result" items="${ mainBusinessList }" varStatus="status">
									<c:if test="${result.expsrYn == 'Y'}">
										<div class="swiper-slide" style="background: url(${publicUrl}${result.imageFlpthPc}) no-repeat center center / cover">
											<div class="text-area">
												<div class="title">
													<span>${ result.mainNttSjPc }</span><a href="${result.linkUrl1 }">
														<span class="btn btn-circle btn-white btn-md">
															<i class="icon icon-arrow-right-short"></i>
														</span>
													</a>  
												</div>
												<div class="desc">
													${fn:replace(result.mainNttCnPc, newline, "<br/>")}
												</div>	
											</div> 
										</div>	  
									</c:if>	        
								</c:forEach>	
				
							</div>		
						</div>				
					</div>
					<script>
						$(document).ready(function (){
							/*slide 영역*/
								new Swiper ("._businessSlider", {
								slidesPerView: "auto",
								centeredSlides: true,
								loop: true,
							});
						})
					</script>		
				</div>
			</article>
			<script>
				$(document).ready(function(){
					$('.business').css("cursor","url('/publishing/pc-ko/dist/img/main/img-cursor.cur'), auto");
				});
			</script>
			<!-- e  business slide -->				
			
			<!-- e  business  slide -->
			
			<!-- s  People :2023리뉴얼 -->
			<article class="section-people">
				<div class="info-box" data-aos="fade-up" data-aos-duration="500">
					<h3 class="title">People</h3>        
					<h4 class="desc">
						<p data-aos="fade-up" data-aos-duration="500" data-aos-delay="200">
							전세계 곳곳에 위치한 마크로젠 팀, 글로벌 파트너, 고객들을 만나보세요
						</p>
					</h4>            
				</div>               

				<div class="people_swiper _peopleSlider" data-aos="fade-up" data-aos-duration="500" data-aos-delay="100">
					<div class="swiper-wrapper">
				   
						<c:forEach var="result" items="${ mainPeopleList }" varStatus="status">         
							 <c:if test="${ result.viewYn == 'Y' }">
								<div class="swiper-slide bg0${status.index % 5 + 1}">
									<div class="flip">
										<div class="front">
											<span class="img"><img src="${publicUrl}${result.imageFlpthPc}" alt="1"></span>      
											<div class="info-area">
												<span class="name" data-aos="fade-up" data-aos-duration="900" data-aos-delay="100">
													<strong>${ result.peopleNm }</strong><br>
														${ result.peopleDept }
												</span>                                            
												<p href="#" class="btn btn-text" data-aos="fade-up" data-aos-duration="900" data-aos-delay="100"><span>MORE</span><i class="icon icon-arrow-right-long"></i></p>                      
											</div>       
										</div>
										<div class="back">
											<div  data-aos="fade-up" data-aos-duration="900" data-aos-delay="100">
												<span class="name"><strong>${ result.peopleNm }</strong><p>${ result.peopleDept }</p></span>
												<p class="txt">${ result.cnPc }</p>
											</div>
										</div>
									</div>                            
								</div>    
							 </c:if>      			               
						</c:forEach>
						  
					</div>
				</div>
			</article>
				
			<script>
				$(function(){                
				var pSwiper;
				setSlider2();
				function setSlider2() {      
					// var pSwiper;
					var $container = $('._peopleSlider');
					var $conLi = $container.find('.swiper-slide');                                
					var conCnt = $conLi.length;
					let options = {};

					if (pSwiper !== undefined) {
						console.log('pSwiper');
						return false
					}

					var html = $("._peopleSlider .swiper-wrapper").html();                        
					$("._peopleSlider .swiper-wrapper").append(html);                        
					
					if(conCnt < 4){
						$container.addClass("sm");                               
					}    
					options = {
						// observer: true,
						// observeParents: true,
						centeredSlides: true, 
						slidesPerView: "auto",
						slideToClickedSlide : true,
						loop:true,
						loopedSlides: conCnt,
						loopAdditionalSlides: 10,
						allowTouchMove : true,
						speed: 1000,
						lazy: true,
						on: {
							slideChangeTransitionStart: function () {
							$('.flip .back').removeClass('aos-init').removeClass('aos-animate');
							},
							slideChangeTransitionEnd: function () {
								$('.flip .back').show(0);
								AOS.init();
							},
						}
					}       
					pSwiper = new Swiper($container, options)               
				}          
				
				$('._peopleSlider .swiper-slide').on('click',function (){                             
					var swiper = $(this);                        
					if(!swiper.hasClass('rotate') ) {
						swiper.addClass("rotate").siblings().removeClass("rotate");
					}
					else{
						swiper.removeClass("rotate");
					}                                                                
				})    
			   
				//resize
				window.addEventListener('resize', function(){
					$('._peopleSlider').addClass("resize");
					pSwiper.update();
				})
			});
			</script>
            <!-- e  People :2023리뉴얼-->    	
			
			 <!-- s  media -->
            <article class="section-media">
            	<div class="info-box">
                    <div class="title" data-aos="fade-up" data-aos-duration="1000">News &amp; Events</div>                    
                </div>
                <div class="media" data-aos="fade-left" data-aos-duration="800" data-aos-delay="400">
                
				<div class="slider"> 

					<div class="slider-navigation">
						<a href="#" class="btn btn-circle btn-white btn-sm _btnPrev"><i class="icon icon-arrow-left-sm"></i></a>
						<a href="#" class="btn btn-circle btn-white btn-sm _btnNext"><i class="icon icon-arrow-right-sm"></i></a>
					</div>
							        
					<div class="swiper-container _mediaSlider">
						<div class="swiper-wrapper">
							        	
							<c:forEach var="result" items="${ mainSomlnkList }" varStatus="status">
								<div class="swiper-slide">
									<a href="${ result.somlnkUrl }" target="_blank">
										<div class="img">
											<img src="${publicUrl}${result.imageFlpth}" alt="${result.somlnkSj.replaceAll('[^a-zA-Z0-9\\s]', '')}" >
											<span class="sns">${result['somlnkCtgryCodeNm'.concat(lang)] }</span>
										</div>
										<div class="content">
											<strong class="title">${ result.somlnkSj }</strong>
											<p>${ result.somlnkDt }</p>
										</div>
										<div class="date"><fmt:formatDate value="${result.postDt }" pattern="yyyy.MM.dd" /></div>
									</a>
								</div>
							</c:forEach>
							        		
							</div>
						</div>				        
					</div>
					<script>
						new Swiper("._mediaSlider", {
							spaceBetween: 52,
							slidesPerView: "auto",
							slidesPerGroup: 3,
							grabCursor: true,
							loopFillGroupWithBlank : true, // 그룹수가 맞지 않을 경우 빈칸으로 메우기(3개가 나와야 되는데 1개만 있다면 2개는 빈칸으로 채워서 3개를 만듦)
							/* loop : true, */
							navigation: {
								nextEl: "._btnNext",
								prevEl: "._btnPrev",
							},
						});
					</script>
				</div>
			</article>
	
			<!-- s  global map -->
            <article class="section-map" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <div class="inner">
                    <div class="info-box">
                        <h3 class="title" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">Global Network</h3>
                        <h4 class="desc" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                            <!--2023-04-28::내용삭제 국내 지사를 포함하여 -->세계 각지의 글로벌 네트워크를 통해<br>현지 고객의 다양한 요구에 부합하는 맞춤형 
                           서비스를 더욱  신속하고 체계적으로 제공합니다
                        </h4>
                    </div>
                    <!-- <div class="map">
                        <a class="pin amsterdam" onClick="location.href='01Macrogen_06글로벌네트워크.html#amsterdam'"><i></i><span>Amsterdam, The Netherlands</span></a>
                        <a class="pin seoul" onClick="location.href='01Macrogen_06글로벌네트워크.html#seoul'"><i></i><span>Seoul, Korea</span></a>
                        <a class="pin boston" onClick="location.href='01Macrogen_06글로벌네트워크.html#rockville'"><i></i><span>Boston, USA</span></a>
                        <a class="pin tokyo" onClick="location.href='01Macrogen_06글로벌네트워크.html#tokyo'"><i></i><span>Tokyo, japan</span></a>
                        <a class="pin virginia" onClick="location.href='01Macrogen_06글로벌네트워크.html#rockville'"><i></i><span>Virginia, USA</span></a>
                        <a class="pin madrid" onClick="location.href='01Macrogen_06글로벌네트워크.html#madrid'"><i></i><span>Madrid, Spain</span></a>
                        <a class="pin kyoto" onClick="location.href='01Macrogen_06글로벌네트워크.html#tokyo'"><i></i><span>Kyoto, japan</span></a>
                        <a class="pin newyork" onClick="location.href='01Macrogen_06글로벌네트워크.html#rockville'"><i></i><span>New york, USA</span></a>
                        <a class="pin synapse" onClick="location.href='01Macrogen_06글로벌네트워크.html#synapse'"><i></i><span>Synapse, Singapore</span></a>
                        <a class="pin rockville" onClick="location.href='01Macrogen_06글로벌네트워크.html#rockville'"><i></i><span>Rockville, USA</span></a>
                    </div> -->
                    <div class="map">
                        <a class="pin amsterdam" onClick="location.href='/${rc.locale.language}/company/global-network#amsterdam'"><i></i><span>Amsterdam, Netherlands</span></a>
                      	<a class="pin leuven" onClick="location.href='/${rc.locale.language}/company/global-network#leuven'"><i></i><span>Ghent, Belgium</span></a>
                      	<a class="pin paris" onClick="location.href='/${rc.locale.language}/company/global-network#paris'"><i></i><span>Paris, France</span></a>
                      	<a class="pin basel" onClick="location.href='/${rc.locale.language}/company/global-network#basel'"><i></i><span>Basel, Switzerland</span></a>
                      	<a class="pin milan" onClick="location.href='/${rc.locale.language}/company/global-network#italy'"><i></i><span>Milan, Italy</span></a>
                      	<a class="pin poland" onClick="location.href='/${rc.locale.language}/company/global-network#poland'"><i></i><span>Szczecin, Poland</span></a>
                        <a class="pin madrid" onClick="location.href='/${rc.locale.language}/company/global-network#madrid'"><i></i><span>Madrid, Spain</span></a>
                        <a class="pin seoul" onClick="location.href='/${rc.locale.language}/company/global-network#seoul'"><i></i><span>Seoul, Korea</span></a>
                        <a class="pin songdo" onClick="location.href='/${rc.locale.language}/company/global-network#songdo'"><i></i><span>Songdo, Korea</span></a>
                        <a class="pin daejeon" onClick="location.href='/${rc.locale.language}/company/global-network#daejeon'"><i></i><span>Daejeon, Korea</span></a>
                        <a class="pin tokyo" onClick="location.href='/${rc.locale.language}/company/global-network#tokyo'"><i></i><span>Tokyo, japan</span></a>
                        <a class="pin biopolis" onClick="location.href='/${rc.locale.language}/company/global-network#biopolis'"><i></i><span>Biopolis, Singapore</span></a>
                        <a class="pin boston" onClick="location.href='/${rc.locale.language}/company/global-network#rockville'"><i></i><span>Boston, USA</span></a>
                        <a class="pin newyork" onClick="location.href='/${rc.locale.language}/company/global-network#rockville'"><i></i><span>New york, USA</span></a>
                        <a class="pin rockville" onClick="location.href='/${rc.locale.language}/company/global-network#rockville'"><i></i><span>Rockville, USA</span></a>
                        <a class="pin virginia" onClick="location.href='/${rc.locale.language}/company/global-network#rockville'"><i></i><span>Virginia, USA</span></a>
		                <a class="pin manchester" onClick="location.href='/${rc.locale.language}/company/global-network2#manchester'"><i></i><span>Manchester, UK</span></a>
		                <a class="pin berlin" onClick="location.href='/${rc.locale.language}/company/global-network2#berlin'"><i></i><span>Berlin, Germany</span></a>
                        <a class="pin santiago" onClick="location.href='/${rc.locale.language}/company/global-network#santiago'"><i></i><span>Santiago, Chile</span></a>
                    </div>
                    <script>
                        $('.map .pin').on('click', function () {
                            $(this).addClass('active')
                                .siblings().removeClass('active')
                        })
                    </script>
                </div>
            </article>
            <!-- e  global map -->
            
            <!-- s  People :2023리뉴얼 -->
            <article class="section-partners" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <div class="info-box">
                    <h3 class="title" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">Global Partners</h3>     
                    <h4 class="desc" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" >
                       세계적인 파트너들이 마크로젠과 함께 합니다
                    </h4>               
                </div>
                <ul class="partners-list"  data-aos="fade-up" data-aos-duration="500" data-aos-delay="400">
                    <li>                                                
                        <img src="/publishing/pc-ko/dist/img/main/img-global_01.png" alt="일루미나">
                    </li>                    
                    <li>                                                
                        <img src="/publishing/pc-ko/dist/img/main/img-global_02.png" alt="팩바이오">
                    </li>                    
                    <li>                                                
                        <img src="/publishing/pc-ko/dist/img/main/img-global_03.png" alt="써모피셔">
                    </li>                    
                    <li>                                                
                        <img src="/publishing/pc-ko/dist/img/main/img-global_04.png" alt="지노믹스">
                    </li>                    
                    <li>                                                
                        <img src="/publishing/pc-ko/dist/img/main/img-global_05.png" alt="올링크">
                    </li>                    
                    <li>                                                
                        <img src="/publishing/pc-ko/dist/img/main/img-global_06.png" alt="애질런트">
                    </li>                    
                    <li>                                                
                        <img src="/publishing/pc-ko/dist/img/main/img-global_07.png" alt="나노스트링">
                    </li>  
                    <li>                                                
                        <img src="/publishing/pc-ko/dist/img/main/img-global_08.png" alt="마이크로소프트">
                    </li>   
                    <li>                                                
                        <img src="/publishing/pc-ko/dist/img/main/img-global_09.png" alt="트위스트">
                    </li>   
                    <li>                                                
                        <img src="/publishing/pc-ko/dist/img/main/img-global_10.png" alt="나노포어">
                    </li>
					<li>
						<img src="/publishing/pc-ko/dist/img/main/img-global_11.png" alt="울티마지노믹스">
					</li>
                </ul> 
            </article>
            <!-- e  People :2023리뉴얼--> 
		</div>
	</section>        
	
	<c:import url="/inc/footer" />
	
	<a href="#" class="btn btn-text btn-totop">
	    <i class="icon icon-arrow-top-long"></i>
	    <span>TOP</span>
	</a>
    <!-- <a href="#" class="btn btn-text btn-totop"><a>
    <i class="icon icon-arrow-top-long"></i> 
    <span>TOP</span> -->
	
	<script>
	    $(document).ready(function(){
	        $('.btn-totop').click(function(){
	            $('html,body').animate( { scrollTop:0 },{duration : 100});
	            $('.header').css({'display' : 'block'});
	            return false;
	        });
	        $(window).on('scroll', function (){
	            var scrollTop = $(window).scrollTop()
	            if (scrollTop > 150) {
	                $('.btn-totop').css({'opacity' : 1})
	            } else {
	                $('.btn-totop').css({'opacity' : 0})
	            }
	        })
	    });
	</script>

</main>  
 
<div id="modal_popup_wrap">
	<div class="modal_popup_content">
	<div class="all-close-wrap">
		<div class="all-form-checkbox" onclick="allPopupChecked()">
			<input class="all-form-checkbox-input" type="checkbox" id="all-popup-sn-0">
			<label class="all-form-checkbox-label" for="all-popup-sn-0">오늘 하루 전체 닫기</label>
		</div>
		<div class="all-close-box" id="all-close-box99" onclick="allPopupClose()">
			<i class="icon ico-close-white"></i>
		</div>	
	</div>
<%-- 팝업 --%>
<c:if test="${not empty popupList  }">
<c:forEach var="popup" items="${popupList}" varStatus="status">
	<div class="modal" tabindex="-1" id="layerPopup${status.index }" data-bs-backdrop="static">
		<input type="hidden" value="${popupCnt}" id="popupCnt">
		<input type="hidden" value="${cookieChkList[status.index]}" id="cookieChkList${status.index }">
	    <div class="modal-dialog modal-dialog-centered layer-modal">
	        <div class="modal-content">
	            <div class="modal-header">
	                <div class="blue-circle">
	                    <i class="icon icon-union"></i>
	                </div>
	            </div>
	            <div class="modal-body">
	                <%-- <p class="title">${popupVo.popupNm }</p>
	                <p class="desc">마크로젠은 핵심 기술력과 글로벌 네트워크를 바탕으로
	                    <br>2020년 창사 이래 최대 실적을 거뒀습니다.
	                    ‘매출액 또는 손익구조 30% 이상 변동 공시’ 를 통해 2020년 연결
	                    <br>재무제표 기준 매출 1,126억 원, 영업이익 72억 원, 당기순이익
	                    <br>908억 원을 달성했습니다.
	                </p> --%>
	                <div class="data-img">
	                    <img src="${publicUrl}${popup.popupImageFlpth}" alt="" onclick="onclickPopupImage('${popup.popupLinkUrl}', '${popup.popupLinkTrgtCode}')">
	                </div>
	                <!-- <div class="btn-area">
	                    <a class="btn btn-sm btn-white" href="#">버튼 1</a>
	                    <a class="btn btn-sm btn-white" href="#">버튼 2</a>
	                </div> -->
	            </div>
	            <div class="modal-footer">
	                <div class="form-check">
	                    <input class="form-check-input" type="checkbox" id="popup-sn${status.index }" value="${ popup.popupSn }" >
	                    <label class="form-check-label" for="popup-sn${status.index }">오늘 하루 이 창 열지 않기</label>
	                </div>
	                <div class="close-box" data-bs-dismiss="modal" aria-label="Close" id="close-box${status.index }" onclick="popupClose('${ popup.popupSn }', '${status.index }')">
	                    <span>Close</span>
	                    <i class="icon ico-close-white"></i>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</c:forEach>
	<script>
		var popupCnt = $("#popupCnt").val();
		
		for(var i=0;i<popupCnt;i++){
			var layerPopupModal = new bootstrap.Modal(document.getElementById('layerPopup'+i))
			var coockieChk = $("#cookieChkList"+i).val();
			
			if(coockieChk == 'true'){
				layerPopupModal.hide();
			}else if(coockieChk =='false'){
				layerPopupModal.show();
			}
		}
	    
	    $('div.modal-backdrop').css("opacity", "0");
	</script>
	<script>

		function onclickPopupImage(url, trgtCode) {
			if (!url) {
				return;
			}

			if (trgtCode === 'NEW') {
				window.open(url);
			} else {
				location.href = url;
			}
		}
		
		function popupClose(sn, idx) {
			if ($('#popup-sn'+idx).is(':checked')) {
				if (!sn) return;
	
				var snListStr = $.cookie('popup-sn-list');
				
				if (!snListStr) {
					snListStr = sn;
				} else if (snListStr.indexOf(sn) < 0) {
					snListStr += ',' + sn;
				}
				$.cookie('popup-sn-list', snListStr, { expires: 1, path: '/'});
			}
			
			var layerPopupModal = new bootstrap.Modal(document.getElementById('layerPopup' + idx));
			
			layerPopupModal.hide();			

			var cookieCnt = 0;
			
			setTimeout(function() {
				for (var i=0; i<popupCnt; i++) {	
					if ($('#cookieChkList' + i).val() === 'false') cookieCnt++;
				}				
			},100);
			
			if (cookieCnt <= 1) {
				$('.all-close-wrap').css('display', 'none')
			};
			
			if ($('#modal_popup_wrap .modal').hasClass('show')) {
				$('html body').css({'overflow' : 'hidden'});
				return;
			} else {
				$('#modal_popup_wrap').css({'display' : 'none', 'opacity' : 0, 'visibility' : 'hidden'});
			}
		}
		
		function allPopupChecked() {
			if ($('#all-popup-sn-0').is(':checked')) {
				$('.modal .modal-footer .form-check-input:checkbox').prop('checked', true);
			} else {
				$('.modal .modal-footer .form-check-input:checkbox').prop('checked', false);
			}
		}
		
		function allPopupClose() {
			if ($('#all-popup-sn-0').is(':checked')) {
				var snLists = '';
				
				for (var i=0; i<popupCnt; i++) {
					snLists += $('.modal .modal-footer .form-check .form-check-input').eq(i).val() + ',';
				}
				
				$.cookie('popup-sn-list', snLists, { expires: 1, path: '/' });	
			}
			
			$('#modal_popup_wrap').parent().remove();
			$('.modal-backdrop').remove();
			$('body').removeClass('modal-open').css({'overflow': 'auto', 'padding': '0'});
		}
	</script>
</c:if>
</div>
</div> 
<script>
	var popupCnt = $("#popupCnt").val();
	var cookieCnt = 0;
	
	for (var i=0; i<popupCnt; i++) {		
		if ($('#cookieChkList' + i).val() === 'false') cookieCnt++;
	}
	if (cookieCnt <= 1) $('.all-close-wrap').css('display', 'none');

	if ($('#modal_popup_wrap').find('.modal').length === 0) $('#modal_popup_wrap').remove();
	
</script>
 
</body>
