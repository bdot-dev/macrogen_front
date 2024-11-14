<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/inc/taglib.jsp"%>
<footer class="footer main" ${ main_yn eq 'Y' ? 'data-aos="fade-up" data-aos-duration="2000"' : '' }>
    <div class="font-h5">Macrogen</div>
    <div class="info">
        <p>238, Teheran-ro, Gangnam-gu, Seoul, Republic of Korea</p>
        <p>TEL : <a href="tel:02-2180-7000">02-2180-7000</a></p>
        <p>ⓒMacrogen, Inc. All Rights Reserved.</p>
    </div>
    <div class="link-list">
        <ul>
            <li>
                <select class="select" title="serviceSite" onchange="openWindowInFooter(this)">
                	<option value="">Service&Policy</option>
                    <option value="https://dna.macrogen.com/">Order site</option>
                    <option value="/${rc.locale.language }/policy/privacy">Privacy Statement</option>
                    <%-- <option value="/${rc.locale.language }/policy/inside">내부정보관리규정</option> --%>
                    <option value="/${rc.locale.language }/policy/image/">Image Information Processing Policy</option>
                    <option value="/${rc.locale.language }/company/sitemap">sitemap</option>
                    <option value="/${rc.locale.language }/contact-us">Contact us</option>
                </select>
            </li>
            
            <li>
                <select class="select" title="familySite" onchange="openWindowInFooter(this)">
                    <option value="">Family Site</option>
                   <!-- <option value="https://thebiome.life/">The Biome</option> -->
                    <option value="https://www.my-genomestory.com/">My Genomestory</option>
                    <option value="https://blog.naver.com/macrogen123">myPETGENE</option>
                    <option value="https://psomagen.com/">Psomagen</option>
                    <option value="https://www.macrogen-japan.co.jp/">Macrogen Japan</option>
                    <option value="https://www.macrogen-europe.com">Macrogen Europe</option>
                    <option value="https://macrogenclinical.com/macrogen/">Macrogen Spain</option>
                    <option value="https://www.macrogen-apac.com/">Macrogen APAC</option>
                    <option value="http://gmi.ac.kr/index.php">Genome Medicine Institute</option>
                    <option value="http://www.g2if.org/">Gong-Wu Genome<br/>Information Foundation</option>
                    <option value="http://www.genehealth.or.kr/">Genehealth</option>
                </select>
            </li>
        </ul>
    </div>
    <ul class="sns">
        <li><a href="https://www.facebook.com/macrogenkr/" target="_blank"><i class="icon icon-facebook"></i></a></li>
        <li><a href="https://www.youtube.com/channel/UCT1qyaOiPM7syCEC_T8jmTw" target="_blank"><i class="icon icon-youtube"></i></a></li>
        <li><a href="https://www.linkedin.com/company/macrogen" target="_blank"><i class="icon icon-blog"></i></a></li>
        <li><a href="https://blog.naver.com/macrogen_official" target="_blank"><i class="icon icon-linkedin"></i></a></li>
    </ul>
</footer>
<script>
	function openWindowInFooter(select) {
		var url = select.value;
		if (!url) return;

		if (url.startsWith('http')) {
			location.href = url;
			select.value = '';
		} else {
			location.href = url;
		}

	}
</script>
