// 鲜花数据
const flowerData = [
  {
    id: 1,
    name: '忘情巴黎',
    price: 299,
    category: 'rose',
    image: 'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/254c2f1d54ddc7249dd21c267e9332c9.jpg',
    description: '33朵红玫瑰'
  },
  {
    id: 2,
    name: '月光女神',
    price: 269,
    category: 'lily',
    image: 'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/f6477d496a4563398731d1c8fbad22df.jpg',
    description: '19朵白百合'
  },
  {
    id: 3,
    name: '我只钟情你',
    price: 239,
    category: 'rose',
    image: 'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/40bed7cb188a7e7c08942c3dd3c99dd1.jpg',
    description: '11朵香槟玫瑰'
  },
  {
    id: 4,
    name: '缪斯女神',
    price: 269,
    category: 'carnation',
    // image: 'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/f6477d496a4563398731d1c8fbad22df.jpg',
    image: 'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/9fdc3944ebdb541a0692bda4e320c44d.jpg',
    description: '19朵红玫瑰'
  },
  {
    id: 5,
    name: '牵手一生',
    price: 699,
    category: 'rose',
    // image: 'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/40bed7cb188a7e7c08942c3dd3c99dd1.jpg',
    image: 'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/78f8522f5f013692399e61ee4aac7a31.jpg',
    description: '99朵红玫瑰'
  },
  {
    id: 6,
    name: '甜美公主',
    price: 299,
    category: 'mixed',
    // image: 'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/62d51c9ab2bfd9651c445278ae8f8647.jpg',
    image: 'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/62d51c9ab2bfd9651c445278ae8f8647.jpg',
    description: '玫瑰+百合花束'
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // 初始化 AOS 动画库
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  })

  // 如果在鲜花中心页面，初始化鲜花展示
  if (window.location.pathname.includes('flowers.html')) {
    const flowerContainer = document.getElementById('flowerContainer');
    const categorySelect = document.getElementById('flowerCategory');

    // 渲染鲜花卡片
    function renderFlowers(flowers) {
      flowerContainer.innerHTML = '';
      flowers.forEach(flower => {
        const card = document.createElement('div');
        card.className = 'col-sm-6 col-md-4 col-lg-3';
        card.innerHTML = `
          <div class="flower-card">
            <div class="flower-img">
              <img src="${flower.image}" alt="${flower.name}">
              <div class="flower-overlay">
                <a href="flower-detail.html?id=${flower.id}" class="btn-view">查看详情</a>
              </div>
            </div>
            <div class="flower-info">
              <h4>${flower.name}</h4>
              <p>${flower.description}</p>
              <div class="price">¥${flower.price}</div>
              <a href="flower-detail.html?id=${flower.id}" class="btn-view-details">查看详情</a>
            </div>
          </div>
        `;
        flowerContainer.appendChild(card);
      });
    }

    // 初始渲染所有鲜花
    renderFlowers(flowerData);

    // 分类筛选事件
    categorySelect.addEventListener('change', (e) => {
      const category = e.target.value;
      const filteredFlowers = category === 'all'
        ? flowerData
        : flowerData.filter(flower => flower.category === category);
      renderFlowers(filteredFlowers);
    });
  }

  // 返回顶部按钮
  const backToTopBtn = document.getElementById("backToTop")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
    }
  })

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // 导航栏滚动效果
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    }
  })

  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          const navHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })

          // 如果是移动端，点击后关闭导航菜单
          const offcanvas = document.getElementById("navbarOffcanvas")
          if (offcanvas && window.innerWidth < 992) {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas)
            if (bsOffcanvas) {
              bsOffcanvas.hide()
            }
          }
        }
      }
    })
  })

  // 鲜花卡片悬停效果
  const flowerCards = document.querySelectorAll(".flower-card")

  flowerCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.querySelector(".flower-img img").style.transform = "scale(1.1)"
      this.querySelector(".flower-overlay").style.opacity = "1"
    })

    card.addEventListener("mouseleave", function () {
      this.querySelector(".flower-img img").style.transform = "scale(1)"
      this.querySelector(".flower-overlay").style.opacity = "0"
    })
  })

  // 获取URL参数函数
  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
  }

  // 如果是详情页面，加载花卉信息
  if (window.location.pathname.includes('flower-detail.html')) {
    const params = getUrlParams();
    const flowerId = params.id;

    // 花卉数据
    const flowers = {
      1: {
        name: '忘情巴黎',
        price: 299,
        description: '33朵红玫瑰，搭配满天星、尤加利叶，黑色包装纸，红色丝带蝴蝶结。红玫瑰代表着热烈的爱情，33朵玫瑰花语是"爱上你"，表达了对爱人深深的爱意。',
        images: [
          'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/254c2f1d54ddc7249dd21c267e9332c9.jpg'
        ],
        flowerMaterial: '红玫瑰、满天星、尤加利叶',
        flowerMeaning: '热烈的爱，爱上你',
        occasions: '表白、纪念日、情人节',
        deliveryRange: '全国主要城市',
        deliveryTime: '当日下单，最快2小时送达',
        detailDescription: '忘情巴黎是一款经典的红玫瑰花束，由33朵精选A级红玫瑰精心搭配而成。每一朵玫瑰都经过严格筛选，确保花朵饱满、花色鲜艳。花束整体设计简约而不失浪漫，黑色包装纸衬托出红玫瑰的热烈与奔放，红色丝带蝴蝶结点缀其中，增添了几分精致与优雅。33朵红玫瑰的花语是"爱上你"，表达了对爱人深深的爱意与思念。这款花束适合用于表白、纪念日、情人节等场合，是传递爱意的绝佳选择。',
        flowerIntro: {
          '红玫瑰': '象征着热烈的爱情和真挚的感情，是表达爱意的经典之选。',
          '满天星': '代表着纯洁的心灵和永恒的爱，是玫瑰的最佳搭配。',
          '尤加利叶': '象征着治愈和保护，为花束增添了自然的气息和层次感。'
        }
      },
      2: {
        name: '月光女神',
        price: 269,
        description: '玫瑰作为花束的主体花材，提供了浪漫和优雅的感觉。绣球增添了柔和的色彩和丰满的质感。尤加利叶提供了清新的绿色调和自然的气息。满天星增加了花束的层次感和填充效果，使其更加饱满。以玫瑰、绣球、尤加利叶等为主体花材，搭配满天星等进行填充。',
        images: [
          'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/f6477d496a4563398731d1c8fbad22df.jpg'
        ],
        flowerMaterial: '玫瑰，绣球，尤加利叶，满天星',
        flowerMeaning: '浪漫、清新与美好',
        occasions: '适用于生日、纪念日、婚礼、探望病人、家居装饰等多种场合',
        deliveryRange: '全国主要城市',
        deliveryTime: '当日下单，最快2小时送达',
        detailDescription: '采用简约的灰色几何包装纸，搭配黑白相间的丝带，显得简约而高雅。花束直径约20-25厘米，高度约40-45厘米。收到花束后，建议尽快将花茎剪斜，放入清水中，每隔两天换一次水，并修剪花茎，以延长鲜花的保鲜期。',
        flowerIntro: {
          '玫瑰': '是世界上最受欢迎的花卉之一，以其美丽的花朵和迷人的香气而闻名。',
          '绣球': '花朵大而艳丽，颜色丰富多样，给人以丰富的视觉享受。',
          '尤加利叶': '具有独特的香气和形状，常用于花束和花艺设计中，为作品增添自然和清新的感觉。',
          '满天星': '小花密集，常作为花束的填充花材，使整个花束看起来更加丰满和丰富。'
        }
      },
      3: {
        name: '我只钟情你',
        price: 239,
        description: '8 - 10枝香槟玫瑰，作为花束的焦点花材，以其优雅的香槟色和丝绒般的花瓣质地，营造出浪漫且高级的氛围。白色小雏菊，穿插在香槟玫瑰之间，增加清新感和层次感，形成色彩和纹理上的对比。紫色满天星簇拥在香槟玫瑰周围，增添梦幻色彩，使整个花束更加饱满，丰富视觉效果。尤加利叶作为点缀的绿叶花材，提供清新的绿色调和自然的气息，平衡整体色彩，增添生机活力。',
        images: [
          'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/40bed7cb188a7e7c08942c3dd3c99dd1.jpg'
        ],
        flowerMaterial: '香槟玫瑰，白色小雏菊，紫色满天星，尤加利叶',
        flowerMeaning: '象征着浪漫的爱情、魅力与感激之情，也寓意着平安、健康和新的开始',
        occasions: '此花束适用于生日庆祝、纪念日、婚礼、表白、探望病人等多种场合，无论是送给自己还是他人，都能传递美好情感，增添温馨氛围',
        deliveryRange: '全国主要城市',
        deliveryTime: '当日下单，最快2小时送达',
        detailDescription: '采用深蓝色包装纸搭配白色丝带，简约而高雅，与花材的颜色相得益彰，展现出低调的奢华感。花束高度约 40 - 45 厘米，宽度约 20 - 25 厘米，适合手持展示，也可放置于桌面、茶几等位置，既能作为室内装饰，又能用于特殊场合赠送。收到花束后，尽快将花茎斜剪 45 度，插入装有清水的容器中，每隔一天换一次水并重新修剪花茎，避免阳光直射和高温潮湿环境，以延长保鲜期。',
        flowerIntro: {
          '香槟玫瑰': '香槟玫瑰颜色独特，既具有玫瑰的浪漫与优雅，又带着一丝奢华与时尚感。其花瓣层次丰富，质感如丝绒般柔软，香气浓郁而迷人，是花艺设计中的明星花材之一。',
          '白色小雏菊': '白色小雏菊花朵小巧玲珑，花瓣洁白如雪，花心呈金黄色，给人一种清新、纯净的感觉。它们在花束中起到调节色彩平衡的作用，增添了田园风情与活泼气息。',
          '紫色满天星': '紫色满天星花朵细小密集，呈现出柔和的紫色调，如繁星般点缀在花束中，为整体增添了一份浪漫与神秘感，是营造氛围的绝佳花材。',
          '尤加利叶': '尤加利叶叶片呈蓝绿色，形状独特，带有清新的柠檬香气，具有很强的辨识度。其清新的外观和宜人的香气，使得花束更具自然气息，能够提升整个作品的质感。'
        }
      },
      4: {
        name: '缪斯女神',
        price: 269,
        description: '红色玫瑰11枝，色泽鲜艳，象征着热烈的爱情和激情。白色满天星点缀于玫瑰之间，增添清新感和层次感。红色小果穿插其中，增加色彩的丰富度和活力。绿叶配材包括尤加利叶等，提供自然的绿色背景，突出红色玫瑰的鲜艳。',
        images: [
          'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/f6477d496a4563398731d1c8fbad22df.jpg'
        ],
        flowerMaterial: '玫瑰，红色小果，满天星',
        flowerMeaning: '代表热烈的爱情、渴望与激情',
        occasions: '适用于生日、婚礼',
        deliveryRange: '全国主要城市',
        deliveryTime: '当日下单，最快2小时送达',
        detailDescription: '采用黑色包装纸搭配条纹丝带，简约而高雅，展现出低调的奢华感。花束高度约40-45厘米，宽度约20-25厘米，适合手持展示，也可放置于桌面、茶几等位置。收到花束后，尽快将花茎斜剪45度，插入装有清水的容器中，每隔一天换一次水并重新修剪花茎，避免阳光直射和高温潮湿环境，以延长保鲜期。',
        flowerIntro: {
          '红色玫瑰': '红色玫瑰是爱情的象征，花瓣层层叠叠，色彩鲜艳，香气浓郁，是表达爱意的经典花材。',
          '白色满天星': '花朵细小而密集，白色满天星如繁星般点缀在花束中，为整体增添了一份浪漫与清新。',
          '红色小果': '红色小果色泽鲜艳，形状小巧，为花束增添了活力和色彩的丰富度。',
          '绿叶配材': '绿叶配材如尤加利叶等，叶片形状独特，颜色鲜绿，能够平衡整体色彩，增添生机与自然感。'
        }
      },
      5: {
        name: '牵手一生',
        price: 699,
        description: '红色玫瑰11枝，色泽鲜艳，象征着热烈的爱情和激情。白色满天星点缀于玫瑰之间，增添清新感和层次感。绿叶配材包括尤加利叶等，提供自然的绿色背景，突出红色玫瑰的鲜艳。',
        images: [
          // 'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/40bed7cb188a7e7c08942c3dd3c99dd1.jpg'
          'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/78f8522f5f013692399e61ee4aac7a31.jpg'
        ],
        flowerMaterial: '红色玫瑰，白色满天星',
        flowerMeaning: '代表热烈的爱情、渴望与激情',
        occasions: '适用于生日、婚礼',
        deliveryRange: '全国主要城市',
        deliveryTime: '当日下单，最快2小时送达',
        detailDescription: '采用紫色包装纸搭配条纹丝带，简约而高雅，展现出浪漫与精致。。花束高度约40-45厘米，宽度约20-25厘米，适合手持展示，也可放置于桌面、茶几等位置。收到花束后，尽快将花茎斜剪45度，插入装有清水的容器中，每隔一天换一次水并重新修剪花茎，避免阳光直射和高温潮湿环境，以延长保鲜期。',
        flowerIntro: {
          '红色玫瑰': '红色玫瑰是爱情的象征，花瓣层层叠叠，色彩鲜艳，香气浓郁，是表达爱意的经典花材。',
          '白色满天星': '花朵细小而密集，白色满天星如繁星般点缀在花束中，为整体增添了一份浪漫与清新。',
          '绿叶配材': '绿叶配材如尤加利叶等，叶片形状独特，颜色鲜绿，能够平衡整体色彩，增添生机与自然感。'
        }
      },
      6: {
        name: '甜美公主',
        price: 299,
        description: '粉色玫瑰10枝，带来浪漫和温柔的氛围。白色玫瑰10枝，增添纯洁和高雅的气息。绿色叶材包括尤加利叶和栀子叶，提供清新的绿色背景，突出玫瑰的色彩。',
        images: [
          // 'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/254c2f1d54ddc7249dd21c267e9332c9.jpg'
          'https://demoall.kuaituiyun.cn/8054/uploads/allimg/20190716/62d51c9ab2bfd9651c445278ae8f8647.jpg'
        ],
        flowerMaterial: '粉色玫瑰，白色玫瑰',
        flowerMeaning: '象征浪漫、感激与欣赏，传递温柔的情感',
        occasions: '此花束适用于生日、母亲节、毕业典礼等多种温馨场合，是表达祝福和情感的理想选择',
        deliveryRange: '全国主要城市',
        deliveryTime: '当日下单，最快2小时送达',
        detailDescription: '采用绿色包装纸搭配条纹丝带，展现清新与自然的风格。花束高度约40-45厘米，宽度约20-25厘米，适合手持展示，也可放置于桌面、茶几等位置。收到花束后，尽快将花茎斜剪45度，插入装有清水的容器中，每隔一天换一次水并重新修剪花茎，避免阳光直射和高温潮湿环境，以延长保鲜期。',
        flowerIntro: {
          '粉色玫瑰': '粉色玫瑰以其柔和的色彩和浪漫的气质，成为表达爱情、感激和欣赏的经典花材。',
          '白色玫瑰': '白色玫瑰以其纯洁的色彩和优雅的姿态，传递着清纯的爱情和美好的祝愿。',
          '绿色叶材': '绿叶配材如尤加利叶等，叶片形状独特，颜色鲜绿，能够平衡整体色彩，增添生机与自然感。'
        }
      }
    };

    // 获取花卉信息
    const flower = flowers[flowerId];
    if (flower) {
      // 更新页面标题
      document.title = `${flower.name} - 秋棠鲜花`;

      // 更新花卉名称
      document.querySelector('.product-info h1').textContent = flower.name;

      // 更新价格
      document.querySelector('.product-price').textContent = `¥${flower.price}`;

      // 更新描述
      document.querySelector('.product-description p').textContent = flower.description;

      // 更新元数据
      const metaItems = document.querySelectorAll('.product-meta-item');
      if (metaItems.length >= 5) {
        metaItems[0].querySelector('div:last-child').textContent = flower.flowerMaterial;
        metaItems[1].querySelector('div:last-child').textContent = flower.flowerMeaning;
        metaItems[2].querySelector('div:last-child').textContent = flower.occasions;
        metaItems[3].querySelector('div:last-child').textContent = flower.deliveryRange;
        metaItems[4].querySelector('div:last-child').textContent = flower.deliveryTime;
      }

      // 更新商品详情选项卡内容
      const descriptionTab = document.getElementById('description');
      if (descriptionTab) {
        let detailHtml = `<h4>商品详情</h4><p>${flower.detailDescription}</p><h5>花材介绍</h5>`;
        
        // 添加花材介绍
        for (const [material, intro] of Object.entries(flower.flowerIntro)) {
          detailHtml += `<p><strong>${material}：</strong>${intro}</p>`;
        }
        
        descriptionTab.innerHTML = detailHtml;
      }

      // 更新图片
      const productImage = document.querySelector('.single-product-image img');
      if (productImage && flower.images && flower.images.length > 0) {
        productImage.src = flower.images[0];
        productImage.alt = `${flower.name} - 图片`;
      }
    }
  }

  // 轮播图自动播放
  const carousel = document.getElementById("hero")
  const carouselInstance = new bootstrap.Carousel(carousel, {
    interval: 5000,
  })

  // 表单提交
  const contactForm = document.querySelector(".contact-form form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // 模拟表单提交
      const submitButton = this.querySelector(".btn-submit")
      const originalText = submitButton.textContent

      submitButton.disabled = true
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...'

      setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> 发送成功'

        // 重置表单
        this.reset()

        setTimeout(() => {
          submitButton.disabled = false
          submitButton.textContent = originalText
        }, 2000)
      }, 1500)
    })
  }

  // 添加自定义样式
  const style = document.createElement("style")
  style.textContent = `
        .toast-notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background-color: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            z-index: 9999;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .toast-notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .toast-notification i {
            margin-right: 10px;
            font-size: 1.2rem;
        }
        
        .pulse {
            animation: pulse 0.3s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        /* 图片悬停效果 */
        .flower-img {
            overflow: hidden;
        }
        
        /* 按钮悬浮效果 */
        .btn-outline-light {
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        
        .btn-outline-light:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background-color: var(--primary-color);
            transition: all 0.3s ease;
            z-index: -1;
        }
        
        .btn-outline-light:hover {
            color: white;
            border-color: var(--primary-color);
        }
        
        .btn-outline-light:hover:before {
            left: 0;
        }
    `

  document.head.appendChild(style)

  // 底部导航和电话弹窗功能
  const navToggle = document.getElementById("navToggle");
  const phoneToggle = document.getElementById("phoneToggle");
  const phoneModal = document.getElementById("phoneModal");
  const closePhoneModal = document.getElementById("closePhoneModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const copyPhone = document.getElementById("copyPhone");

  // 导航按钮点击事件
  if (navToggle) {
    navToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const offcanvas = document.getElementById("navbarOffcanvas");
      const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
      bsOffcanvas.show();
    });
  }

  // 电话按钮点击事件
  if (phoneToggle) {
    phoneToggle.addEventListener("click", (e) => {
      e.preventDefault();
      phoneModal.classList.add("active");
      modalOverlay.classList.add("active");
    });
  }

  // 关闭电话弹窗
  if (closePhoneModal) {
    closePhoneModal.addEventListener("click", () => {
      phoneModal.classList.remove("active");
      modalOverlay.classList.remove("active");
    });
  }

  // 点击遮罩层关闭弹窗
  if (modalOverlay) {
    modalOverlay.addEventListener("click", () => {
      phoneModal.classList.remove("active");
      modalOverlay.classList.remove("active");
    });
  }

  // 复制电话号码
  if (copyPhone) {
    copyPhone.addEventListener("click", () => {
      const phoneNumber = "13804169642";
      navigator.clipboard.writeText(phoneNumber).then(() => {
        alert("电话号码已复制到剪贴板");
      });
    });
  }

  // 高亮当前活动的底部导航项
  const highlightActiveNavItem = () => {
    const navItems = document.querySelectorAll(".fixed-bottom-nav .nav-item")
    const currentPath = window.location.pathname

    navItems.forEach((item) => {
      const itemPath = item.getAttribute("href")
      // 检查当前路径是否包含导航项的href值
      if (itemPath !== "#" && currentPath.includes(itemPath)) {
        item.classList.add("active")
      } else if (itemPath === "#" && (currentPath === "/" || currentPath.includes("index.html"))) {
        // 如果是首页
        item.classList.add("active")
      } else {
        item.classList.remove("active")
      }
    })
  }

  // 页面加载时高亮导航
  window.addEventListener("load", highlightActiveNavItem)

  // 产品详情页特定脚本
  document.addEventListener("DOMContentLoaded", () => {
    // 缩略图点击事件
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function () {
        thumbnails.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // 数量选择器
    const decreaseBtn = document.getElementById('decreaseQuantity');
    const increaseBtn = document.getElementById('increaseQuantity');
    const quantityInput = document.getElementById('quantity');

    decreaseBtn.addEventListener('click', () => {
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        quantityInput.value = quantity - 1;
      }
    });

    increaseBtn.addEventListener('click', () => {
      let quantity = parseInt(quantityInput.value);
      quantityInput.value = quantity + 1;
    });

    // 加入购物车按钮
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
      const quantity = parseInt(quantityInput.value);
      alert(`已将 ${quantity} 束忘情巴黎添加到购物车`);
    });
  });
})
