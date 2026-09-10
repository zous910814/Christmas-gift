"use strict";

/* ============================================================
   证据资料（调查现场 6 项 + 解谜 3 笔）
   ============================================================ */
const CLUES = {
  ring:   { name:"消失的婚戒",
            popup:"死者的婚戒不见了，右手无名指上还留着一圈浅色的压痕，看起来才刚摘下不久。",
            desc:"婚戒不翼而飞，现场却没有翻找的痕迹。" },
  letter: { name:"撕碎的情书",
            popup:"地上散落着几片泛黄的碎纸，边缘已经不太整齐，纸质摸起来微微发脆，像是放了很久才被撕开的。",
            desc:"信纸边缘的碎屑早已风干，似乎不是今晚才撕碎的。" },
  wine:   { name:"两只酒杯与红酒",
            popup:"桌上摆着两只高脚杯，杯壁上各留着一圈深浅不同的酒渍，红酒瓶只开了一半，瓶口还有一点反光的痕迹。",
            desc:"两杯对饮的红酒，瓶口却只留下一个人的痕迹。" },
  shoe:   { name:"死者的皮鞋",
            popup:"死者的皮鞋擦得很干净，鞋带却系得有点古怪——右脚的鞋带交叉方向和左脚相反，鞋舌也被压得皱皱的，像是被别人重新穿上去的。",
            desc:"鞋带的绑法，和死者本人的习惯不太一样。" },
  fiber:  { name:"沙发上的纤维",
            popup:"沙发扶手边缘勾着几根极淡的绿色纤维，细看像是某种羊毛材质，若不仔细看很容易被忽略。",
            desc:"极淡的绿色羊毛纤维，来源不明。" },
  blood:  { name:"墙上的血字",
            popup:"墙上那个暗红色的字歪歪扭扭，乍看像是随手写就的『厌』，但凑近看，边缘的深浅似乎不太均匀。",
            desc:"一个潦草的『厌』字，深浅似乎藏着更多讯息。",
            image:"assets/blood-mark.png" }
};

const PUZZLE_CLUES = {
  "1": { zhuyin:"ㄏ", popup:"这一笔又直又扁，边缘的血痂比周围更厚更暗，应该是最早写下的一笔。" },
  "2": { zhuyin:"ㄨ", popup:"两道交叉的线条在中央重叠，颜色比外层稍微新鲜一点。" },
  "3": { zhuyin:"ㄤ", popup:"尾端被拉得很长，像是手指颤抖着往下拖曳所留下的痕迹。" }
};

/* ============================================================
   剧本资料
   type: 'chapter' | 'line' | 'investigate' | 'puzzle' | 'envelope' | 'letter' | 'end'
   line: { speaker: 姓名或null, text, bg(可选) }
   ============================================================ */
const N = null; // 旁白 / 无名叙述者，不显示名牌

const script = [
  { type:"chapter", subtitle:"一、一位研究痕迹的人" },

  { type:"line", bg:"room", speaker:N, text:"我第一次见到李智颖，是在洛杉矶一个罕见的雨天。" },
  { type:"line", speaker:N, text:"那年十二月，我因为租约临时中止，经朋友介绍，搬进南加州大学附近的一间公寓。朋友说，我的新室友正在念建筑学，生活安静，唯一的怪癖是喜欢研究犯罪案件。" },
  { type:"line", speaker:N, text:"我抵达时，李智颖正趴在餐桌旁，用放大镜观察三只外表完全相同的咖啡杯。她抬头看了我一眼。" },
  { type:"line", speaker:"李智颖", text:"「你从机场过来，行李在芝加哥转机时被摔过。计程车司机找错一次地址，所以你拖着箱子走了两个街口。」" },
  { type:"line", speaker:N, text:"我愣在门边。" },
  { type:"line", speaker:N, text:"「你认识我？」" },
  { type:"line", speaker:"李智颖", text:"「不认识。」" },
  { type:"line", speaker:N, text:"她指向我的行李箱。" },
  { type:"line", speaker:"李智颖", text:"「航空标签上有 ORD。右侧的新裂痕沾着输送带的黑色橡胶粉。轮子上的泥只有左边两个比较厚，表示你刚才沿着倾斜的人行道走了相当一段距离。」" },
  { type:"line", speaker:N, text:"「你都是这样观察别人的吗？」" },
  { type:"line", speaker:"李智颖", text:"「只有当别人把答案带进门的时候。」" },
  { type:"line", speaker:N, text:"后来我才明白，李智颖并不认为自己拥有什么神奇的能力。她只是相信，每一个人都在不知不觉间留下痕迹。鞋底、袖口、气味、说话的顺序，甚至一句回答前不自然的停顿，都可能比本人更加诚实。" },
  { type:"line", speaker:N, text:"我们同住后的第三个星期，也就是平安夜当晚，一个浑身湿透的警探敲响了公寓的门。他带来了一桩连警方也无法解读的命案。" },

  { type:"chapter", subtitle:"二、墙上的「厌」" },

  { type:"line", speaker:N, text:"来人是洛杉矶警局的林警探。他进门后没有脱下大衣，只把手机放到桌上。照片里是一面斑驳的白墙，墙上留着一个暗红色的符号——一个写得极其潦草的简体字：「厌」" },
  { type:"line", speaker:"李智颖", text:"「死者是谁？」" },
  { type:"line", speaker:"林警探", text:"「严守诚，五十六岁，语言科技公司的创办人。今晚被发现死在南加大北侧一栋空置老宅的书房里。」" },
  { type:"line", speaker:"李智颖", text:"「死因？」" },
  { type:"line", speaker:"林警探", text:"「暂时看不出来。没有枪伤或刀伤，只有嘴唇发紫。法医怀疑是毒物。」" },
  { type:"line", speaker:"李智颖", text:"「这个字是用谁的血写的？」" },
  { type:"line", speaker:"林警探", text:"「初步检验属于死者。右手食指也沾着血，所以现场的人都认为这是死亡留言。」" },
  { type:"line", speaker:"李智颖", text:"「严守诚平常使用简体字吗？」" },
  { type:"line", speaker:N, text:"林警探怔了一下。" },
  { type:"line", speaker:"林警探", text:"「我不知道。」" },
  { type:"line", speaker:"李智颖", text:"「那就是第一件应该知道的事。」" },
  { type:"line", speaker:N, text:"十五分钟后，我和李智颖坐上警车，前往命案现场。雨水敲击车窗，街边的圣诞灯在玻璃上拖成一道道模糊的金线。当我们抵达时，老宅外已经停着三辆警车。" },
  { type:"line", bg:"scene", speaker:N, text:"死者倒在二楼书房中央。他的外套扣得整整齐齐，皮鞋干净得近乎异常。手机、钱包和名表都没有遗失，只有原本戴在右手上的婚戒不见了。房间里有两只酒杯、一瓶开过的红酒，以及一封被撕碎的情书。" },
  { type:"line", speaker:"赵警官", text:"「婚戒、情书，再加上墙上的『厌』。我认为是感情纠纷。死者临终前想写的可能是『厌恶』，或者某个读音接近 Yan 的名字。」" },

  { type:"investigate" },

  { type:"line", speaker:N, text:"李智颖没有回答。她先检查死者的鞋底，接着观察门框、地毯和窗台，最后停在血字前。" },
  { type:"line", speaker:"李智颖", text:"「这不是死者走进来时穿的鞋。」" },
  { type:"line", speaker:"赵警官", text:"「尺寸完全吻合。」" },
  { type:"line", speaker:"李智颖", text:"「鞋子属于他，但不是他自己穿上的。外面下着雨，从庭院到玄关至少有十五步，鞋底却没有泥。右脚鞋带还压在鞋舌下面，昏迷的人才不会抱怨这种不舒服。」" },
  { type:"line", speaker:N, text:"她指向沙发扶手边缘几处极淡的绿色纤维。" },
  { type:"line", speaker:"李智颖", text:"「凶手在别处使他失去意识，用毯子包住身体搬上二楼，再替他穿好鞋，制造他自行赴约的假象。」" },
  { type:"line", speaker:N, text:"「那个『厌』是他留下的吗？」" },
  { type:"line", speaker:"李智颖", text:"「其中一部分是。」" },
  { type:"line", speaker:N, text:"李智颖凑近血痕。" },
  { type:"line", speaker:"李智颖", text:"「可是有人改过它。」" },

  { type:"chapter", subtitle:"三、嫌疑人?" },

  { type:"line", speaker:N, text:"当晚曾有三个人来过老宅。" },
  { type:"line", speaker:N, text:"第一个人叫严若晴，是死者分居多年的妻子。两人正在争夺公司股权，而她的名字正好与死者同姓。她在晚上八点抵达，八点二十五分离开。监视器拍到她离开时将婚戒丢还给丈夫，还大声说：「我受够你了。」" },
  { type:"line", speaker:N, text:"第二个人是言绍廷，死者以前的研究助理。「言」与「厌」读音相近。更不利的是，警方在现场找到的情书正是他写的。言绍廷承认自己曾与死者发生争执，却坚称那封信是多年以前的东西，与感情无关。" },
  { type:"line", speaker:N, text:"第三个人，就是黃致瑋。他是一名资料工程师，曾替死者的公司整理语音辨识系统的事故纪录。监视器拍到他九点零五分进入老宅，九点十九分离开。法医初步推测，死亡时间落在九点十分至九点四十分之间。" },
  { type:"line", speaker:"林警探", text:"「严若晴有婚姻动机，言绍廷的名字与血字读音相近，黃致瑋则在死亡时间内进出现场。凶手很可能就在三人之中。」" },
  { type:"line", speaker:N, text:"李智颖拿起桌上的碎纸。" },
  { type:"line", speaker:"李智颖", text:"「这封情书是假的。」" },
  { type:"line", speaker:"林警探", text:"「我们比对过笔迹，确实是言绍廷写的。」" },
  { type:"line", speaker:"李智颖", text:"「纸是真的，内容也是真的，但它不是今晚被撕碎的。」" },
  { type:"line", speaker:N, text:"她将一块纸片靠近桌灯。" },
  { type:"line", speaker:"李智颖", text:"「撕裂处积着细灰，表示它早已破损一段时间。凶手只是从垃圾或旧档案里找到它，再撒到现场。」" },
  { type:"line", speaker:N, text:"接着，她转向死者的妻子。" },
  { type:"line", speaker:"李智颖", text:"「严女士，你丈夫平常使用简体字吗？」" },
  { type:"line", speaker:"严若晴", text:"「会。他在山西长大，写字一直用简体。」" },
  { type:"line", speaker:"李智颖", text:"「他学过注音吗？」" },
  { type:"line", speaker:"严若晴", text:"「当然。他曾去台湾出差五年。」" },
  { type:"line", speaker:N, text:"李智颖再次望向墙上的「厌」。" },
  { type:"line", speaker:"李智颖", text:"「那么，这个字不是他想写的。」" },

  { type:"chapter", subtitle:"四、文字的骨头" },

  { type:"line", speaker:"李智颖", text:"「所有人都先看见『厌』，于是开始替这个字寻找意思。」" },
  { type:"line", speaker:N, text:"李智颖站在墙前，要求警员关掉头顶的灯，只留下手电筒从侧面照射。干燥的血痕立刻显出不同深浅。" },
  { type:"line", speaker:"李智颖", text:"「可是辨认符号不能只看最后的形状，还要看它形成的顺序。」" },
  { type:"line", speaker:N, text:"她取出透明片，覆在现场照片上，沿着较早凝固的边缘，一笔一笔描了出来。" },

  { type:"puzzle" },

  { type:"line", speaker:N, text:"三个符号挤在一起，又被后来的血痕连接，远看才变成一个歪斜的「厌」。" },
  { type:"line", speaker:"李智颖", text:"「ㄏ、ㄨ、ㄤ。」" },
  { type:"line", speaker:"李智颖", text:"「黄。」" },
  { type:"line", speaker:N, text:"房间里没有人说话。" },
  { type:"line", speaker:"李智颖", text:"「死者中毒后手指麻痹，无法写出笔画复杂的『黄』，所以改用曾经学过的注音。他写下凶手姓氏的读音。」" },
  { type:"line", speaker:"李智颖", text:"「凶手回到房间，看见了这三个符号。他没有把血擦掉，因为大面积清理一定会留下痕迹。于是他把三组注音向内抹开，再补上细节，让它看起来像简体字『厌』。」" },
  { type:"line", speaker:"赵警官", text:"「中间那个奇怪的交会是什么？」" },
  { type:"line", speaker:"李智颖", text:"「那是整个伪装最薄弱的地方。」" },
  { type:"line", speaker:N, text:"李智颖指着「厂」与内部笔画相接之处。" },
  { type:"line", speaker:"李智颖", text:"「凶手让上下笔画重合，试图把它变成中文字的一部分。但中央那一笔仍保留着完整的ㄨ形。它既不像犬的撇，也不像中文书写中的点。」" },
  { type:"line", speaker:"李智颖", text:"「警方一旦把它读作『厌』，自然会联想到厌恶、感情纠纷、言绍廷的姓，以及严若晴那句『受够了』。两名无辜者都被一个字安排成了嫌疑人。」" },
  { type:"line", speaker:N, text:"林警探立刻站起来。" },
  { type:"line", speaker:"林警探", text:"「我去找黃致瑋。」" },
  { type:"line", speaker:"李智颖", text:"「不必找。」" },
  { type:"line", speaker:N, text:"李智颖看向窗外。一辆黑色轿车停在警戒线外，引擎仍然运转。" },
  { type:"line", speaker:"李智颖", text:"「他一直没有离开。」" },

  { type:"chapter", subtitle:"五、一句不该知道的话" },

  { type:"line", speaker:N, text:"黃致瑋被带进书房时，神情比我预料中更加平静。" },
  { type:"line", speaker:"李智颖", text:"「你认识死者多久了？」" },
  { type:"line", speaker:"黃致瑋", text:"「一年多。」" },
  { type:"line", speaker:"李智颖", text:"「今晚为什么来这里？」" },
  { type:"line", speaker:"黃致瑋", text:"「严守诚约我修复一份损坏的语音资料。我到达时没有人应门，在楼下等了一会儿就走了。」" },
  { type:"line", speaker:"李智颖", text:"「你上过二楼吗？」" },
  { type:"line", speaker:"黃致瑋", text:"「没有。」" },
  { type:"line", speaker:"李智颖", text:"「进过书房吗？」" },
  { type:"line", speaker:"黃致瑋", text:"「没有。」" },
  { type:"line", speaker:"李智颖", text:"「看见墙上的东西了吗？」" },
  { type:"line", speaker:"黃致瑋", text:"「没有。我根本不知道那个『厌』字写在哪里。」" },
  { type:"line", speaker:N, text:"李智颖没有立刻说话。黃致瑋似乎也在说完后意识到了什么。警方对外只公布现场留有一处不明血痕，从未说那看起来像一个「厌」字。" },
  { type:"line", speaker:"黃致瑋", text:"「也许我刚才听警察提过。」" },
  { type:"line", speaker:"李智颖", text:"「从你进入老宅到现在，没有人在你面前说过那个字。」" },
  { type:"line", speaker:"黃致瑋", text:"「即使我看见过墙面，也不能证明我杀了他。」" },
  { type:"line", speaker:"李智颖", text:"「确实不能。」" },
  { type:"line", speaker:N, text:"李智颖把透明证物袋放到桌上。里面装着一小片绿色羊毛。" },
  { type:"line", speaker:"李智颖", text:"「这是在沙发扶手与书房暖气口找到的纤维。警方刚刚在你的后车厢里找到一条缺角的绿色羊毛毯，切口与这片纤维完全吻合。」" },
  { type:"line", speaker:N, text:"她又指向死者的鞋。" },
  { type:"line", speaker:"李智颖", text:"「他的右脚鞋带采用反向交叉法。这不是他平常的习惯，却和你两只鞋的绑法完全一致。替别人穿鞋时，人会本能地使用自己最熟悉的方式。」" },
  { type:"line", speaker:"李智颖", text:"「现场的红酒也是布置。两只杯子里都有酒，瓶口却只留下你的唾液痕迹。你先喝了一口，再把剩下的酒分进杯中，制造两人对饮的假象。」" },
  { type:"line", speaker:"李智颖", text:"「你偷走婚戒，放入旧情书，再把ㄏㄨㄤ改成『厌』。你不是随意伪造线索，而是精心准备了两名替罪者。」" },
  { type:"line", speaker:N, text:"黃致瑋望着墙上的血痕。" },
  { type:"line", speaker:"黃致瑋", text:"「你知道我为什么杀他吗？」" },
  { type:"line", speaker:"李智颖", text:"「我找到了一份被删除的事故报告。但我想听你亲口说。」" },

  { type:"chapter", subtitle:"六、沉默的声音" },

  { type:"line", speaker:N, text:"三年前，严守诚的公司替医疗机构开发一套紧急语音辨识系统。病患只要说出特定求救词，系统便会自动通知护理人员。然而正式测试前，工程团队发现系统对某些口音的辨识率远低于公司公布的数字。" },
  { type:"line", speaker:N, text:"严守诚担心失去投资，命令团队删除失败样本。" },
  { type:"line", speaker:N, text:"黃致瑋的弟弟正是最早使用那套系统的病患之一。他在病房里连续求救七分钟。系统没有正确辨认他的声音，护理站也没有收到警报。等到有人发现时，已经来不及了。" },
  { type:"line", speaker:N, text:"公司将责任归因于设备断线，并删除了那七分钟的原始录音。" },
  { type:"line", speaker:N, text:"黃致瑋不相信官方报告。他花了几年寻找备份，最后证明系统不但录下了求救声，还曾多次判定「信心不足」，主动忽略警告。严守诚明知真相，却选择沉默。" },
  { type:"line", speaker:N, text:"圣诞节前夕，他终于同意交出完整资料，条件是黃致瑋永远不得公开，并放弃追究公司责任。那不是忏悔，只是另一场交易。" },
  { type:"line", speaker:N, text:"黃致瑋开车去接他，在热咖啡中放入毒物。毒性发作后，他用毯子将严守诚带进老宅，布置好婚戒、酒杯与旧情书。他以为严守诚已经死亡。" },
  { type:"line", speaker:N, text:"没想到严守诚在书房里短暂恢复意识。他的嘴唇因毒物破裂，于是用手指沾血，在墙上写下：「ㄏ　ㄨ　ㄤ」" },
  { type:"line", speaker:N, text:"黃致瑋回到书房，看见了自己的姓。他用血将三个注音连接起来，造出一个似是而非的「厌」。他以为警方会被字义牵着走，也以为没有人会注意那个藏在交会处的ㄨ。" },
  { type:"line", speaker:N, text:"可是李智颖注意到了。她没有只看见一个字。她看见了那个字被制造出来的过程。" },

  { type:"chapter", subtitle:"七、答案" },

  { type:"line", bg:"scene", speaker:"黃致瑋", text:"「他害死了一个人，却还能像什么都没发生一样活着。」" },
  { type:"line", speaker:"李智颖", text:"「所以你也杀了一个人。」" },
  { type:"line", speaker:"黃致瑋", text:"「法律没有给我答案。」" },
  { type:"line", speaker:"李智颖", text:"「因此你决定代替法律？」" },
  { type:"line", speaker:"黃致瑋", text:"「如果那七分钟的录音没有被删掉，我弟弟也许还活着。」" },
  { type:"line", speaker:"李智颖", text:"「那份录音已经找回来了。严守诚应该接受审判，公司也应该为做过的事负责。但理解你的愤怒，不等于赦免你的选择。」" },
  { type:"line", speaker:N, text:"林警探替黃致瑋戴上手铐。离开前，他回头问：" },
  { type:"line", speaker:"黃致瑋", text:"「如果我把整面墙清理干净，你还抓得到我吗？」" },
  { type:"line", speaker:"李智颖", text:"「可以。」" },
  { type:"line", speaker:"黃致瑋", text:"「靠什么？」" },
  { type:"line", speaker:"李智颖", text:"「你的鞋带、后车厢里的纤维、酒瓶上的痕迹、监视器，以及你不知道仍然存在的录音备份。」" },
  { type:"line", speaker:"黃致瑋", text:"「那个字并不重要？」" },
  { type:"line", speaker:"李智颖", text:"「很重要，但不是唯一的答案。」" },
  { type:"line", speaker:N, text:"李智颖望着墙上的血痕。" },
  { type:"line", speaker:"李智颖", text:"「真正高明的谎言，会让人只看见它希望人们看见的形状。可是真相不只藏在形状里。」" },
  { type:"line", speaker:N, text:"她指向血痕重叠的位置。" },
  { type:"line", speaker:"李智颖", text:"「它也藏在每一道痕迹形成的顺序里。」" },
  { type:"line", speaker:N, text:"黃致瑋沉默片刻，苦笑了一下。" },
  { type:"line", speaker:"黃致瑋", text:"「所以，我还是输了。」" },
  { type:"line", speaker:"李智颖", text:"「这不是输赢。」" },
  { type:"line", speaker:N, text:"李智颖平静地回答：" },
  { type:"line", speaker:"李智颖", text:"「这是你做出选择以后，必须承担的结果。」" },

  { type:"chapter", title:"尾声　不是血迹的红色", subtitle:"" },

  { type:"line", bg:"room", speaker:N, text:"案件结束时，已经是圣诞节下午。我和李智颖回到公寓。门口放着一只深红色信封，上面没有邮票，也没有寄件地址。" },
  { type:"line", speaker:N, text:"李智颖检查了信封边缘。" },
  { type:"line", speaker:N, text:"「没有毒药、暗格或血迹。」" },
  { type:"line", speaker:"李智颖", text:"「你怎么知道？」" },
  { type:"line", speaker:N, text:"「和你住了这么久，我总得学会一点。」" },
  { type:"line", speaker:N, text:"她笑了笑，走到门口。" },

  { type:"envelope" },
  { type:"letter" },

  { type:"line", speaker:N, text:"李智颖读完卡片，把它放回信封。" },
  { type:"line", speaker:N, text:"「你看出是谁送的了吗？」我问。" },
  { type:"line", speaker:N, text:"她看了看信封，又望向窗外被夕阳染红的街道。" },
  { type:"line", speaker:"李智颖", text:"「当然。」" },
  { type:"line", speaker:N, text:"「证据呢？」" },
  { type:"line", speaker:N, text:"李智颖轻轻笑了。" },
  { type:"line", speaker:"李智颖", text:"「这一次不需要证据。」" },
  { type:"line", speaker:N, text:"她将卡片收进抽屉。那是整桩案件中唯一没有沾上鲜血的红色，也是那年圣诞节，她保存最久的一件证物。" },

  { type:"end" }
];

const LETTER_TEXT =
"先别担心。\n\n"+
"故事里的黃致瑋确实是一名凶手，但现实中的黃致瑋没有在墙上留下血字，也没有打算用注音误导警察。\n\n"+
"我们运动那天聊到柯南，所以想说送你一个属于你的侦探故事。\n\n"+
"在故事里，所有人看见的都是一个「厌」字。只有你愿意停下来，不被它表面的意思带走，而是重新观察每一笔真正的来历。\n\n"+
"或许这就是我心中的你。\n\n"+
"跟你合作的报告每次都很用心地做完，空闲时间不管是学西洋棋还是运动等，总是抱着很认真的心态去学习，你认真的模样很像故事中的侦探。\n\n"+
"如果福尔摩斯有华生替他记录每一桩案件，那么这一次，我也想替你留下这个故事。\n\n"+
"圣诞快乐，智颖侦探。\n"+
"愿你永远聪明、勇敢，永远能找到想要的答案。\n\n"+
"PS. 柯哀才是最棒的ʕ •ᴥ•ʔ";

/* ============================================================
   引擎
   ============================================================ */
let idx = 0;
let currentBg = "room";
const examined = new Set();
const puzzleDone = new Set();
const evidenceCollected = [];
let typing = false;
let typeTimer = null;

const $ = (id) => document.getElementById(id);

const screens = {};
["screen-title","screen-chapter","screen-vn","screen-investigate","screen-puzzle",
 "screen-envelope","screen-letter","screen-end"].forEach(id=>{ screens[id]=$(id); });

function showScreen(id){
  Object.values(screens).forEach(s=>s.classList.remove("active"));
  screens[id].classList.add("active");
  $("btn-evidence-toggle").classList.toggle("show", id!=="screen-title");
}

function advance(){
  idx++;
  render();
}

function render(){
  const step = script[idx];
  if(!step){ showScreen("screen-end"); return; }

  switch(step.type){
    case "chapter": renderChapter(step); break;
    case "line": renderLine(step); break;
    case "investigate": renderInvestigate(); break;
    case "puzzle": renderPuzzle(); break;
    case "envelope": renderEnvelope(); break;
    case "letter": renderLetter(); break;
    case "end": showScreen("screen-end"); break;
  }
}

/* ---------- 章节卡 ---------- */
function renderChapter(step){
  $("chapter-title").textContent = step.title || "";
  $("chapter-subtitle").textContent = step.subtitle || "";
  showScreen("screen-chapter");
}

/* ---------- 对话行（打字机效果） ---------- */
function renderLine(step){
  if(step.bg) currentBg = step.bg;
  $("vn-bg").className = "scene-bg " + (currentBg==="scene" ? "scene-bg-scene" : "scene-bg-room");
  $("vn-speaker").textContent = step.speaker || "";
  showScreen("screen-vn");
  startTyping(step.text);
}

function startTyping(text){
  clearInterval(typeTimer);
  const el = $("vn-text");
  el.textContent = "";
  let i = 0;
  typing = true;
  typeTimer = setInterval(()=>{
    el.textContent += text[i];
    i++;
    if(i>=text.length){
      clearInterval(typeTimer);
      typing = false;
    }
  }, 26);
}

function finishTyping(){
  clearInterval(typeTimer);
  $("vn-text").textContent = script[idx].text;
  typing = false;
}

/* ---------- 调查现场 ---------- */
function renderInvestigate(){
  examined.clear();
  document.querySelectorAll("#screen-investigate .hotspot").forEach(h=>h.classList.remove("examined"));
  $("clue-count").textContent = "0";
  $("btn-to-next-inv").disabled = true;
  showScreen("screen-investigate");
}

function examineClue(clueId){
  const clue = CLUES[clueId];
  if(!clue) return;
  openExamine(clue.name, clue.popup, clue.image);
  if(!examined.has(clueId)){
    examined.add(clueId);
    document.querySelector(`#screen-investigate .hotspot[data-clue="${clueId}"]`).classList.add("examined");
    $("clue-count").textContent = String(examined.size);
    addEvidence(clueId, clue.name, clue.desc);
    if(examined.size >= Object.keys(CLUES).length){
      $("btn-to-next-inv").disabled = false;
    }
  }
}

/* ---------- 死亡留言解谜 ---------- */
function renderPuzzle(){
  puzzleDone.clear();
  document.querySelectorAll(".stroke-hit").forEach(r=>r.classList.remove("revealed"));
  document.querySelectorAll(".zhuyin-reveal").forEach(z=>z.classList.remove("show"));
  $("puzzle-progress").textContent = "已还原 0 / 3 笔";
  $("btn-to-next-puzzle").disabled = true;
  showScreen("screen-puzzle");
}

function revealStroke(region){
  const info = PUZZLE_CLUES[region];
  if(!info) return;
  openExamine("血痕的笔顺", info.popup);
  if(!puzzleDone.has(region)){
    puzzleDone.add(region);
    document.querySelectorAll(`.stroke-hit[data-region="${region}"]`).forEach(el=>el.classList.add("revealed"));
    $(`zhuyin-${region}`).classList.add("show");
    $("puzzle-progress").textContent = `已还原 ${puzzleDone.size} / 3 笔`;
    if(puzzleDone.size >= 3){
      $("btn-to-next-puzzle").disabled = false;
    }
  }
}

/* ---------- 信封 / 信件 ---------- */
function renderEnvelope(){
  showScreen("screen-envelope");
}
function openEnvelope(){
  advance(); // -> letter
}
function renderLetter(){
  $("letter-body").textContent = LETTER_TEXT;
  showScreen("screen-letter");
}

/* ---------- 检查弹窗 ---------- */
function openExamine(title, text, image){
  $("examine-title").textContent = title;
  $("examine-text").textContent = text;
  const img = $("examine-image");
  if(image){
    img.src = image;
    img.classList.add("show");
  }else{
    img.removeAttribute("src");
    img.classList.remove("show");
  }
  $("examine-overlay").classList.add("active");
}
function closeExamine(){
  $("examine-overlay").classList.remove("active");
}

/* ---------- 证据栏 ---------- */
function addEvidence(id, name, desc){
  if(evidenceCollected.find(e=>e.id===id)) return;
  evidenceCollected.push({id,name,desc});
  renderEvidencePanel();
}
function renderEvidencePanel(){
  const list = $("evidence-list");
  if(evidenceCollected.length === 0){
    list.innerHTML = '<p style="color:var(--ink-dim);font-size:.9rem;">尚未发现任何证据。</p>';
    return;
  }
  list.innerHTML = evidenceCollected.map(e=>`
    <div class="evidence-item">
      <div class="ev-name">${e.name}</div>
      <div class="ev-desc">${e.desc}</div>
    </div>
  `).join("");
}

/* ---------- 雪花 ---------- */
function spawnSnow(){
  const layer = $("snow-layer");
  const count = 45;
  for(let i=0;i<count;i++){
    const flake = document.createElement("div");
    flake.className = "snowflake";
    flake.textContent = "❄";
    flake.style.left = Math.random()*100 + "vw";
    flake.style.fontSize = (10 + Math.random()*14) + "px";
    flake.style.animationDuration = (8 + Math.random()*10) + "s";
    flake.style.animationDelay = (Math.random()*10) + "s";
    layer.appendChild(flake);
  }
}

/* ============================================================
   事件绑定
   ============================================================ */
document.addEventListener("DOMContentLoaded", ()=>{
  spawnSnow();
  renderEvidencePanel();

  $("btn-start").addEventListener("click", ()=>{ idx = 0; render(); });

  $("screen-chapter").addEventListener("click", advance);

  $("vn-box").addEventListener("click", ()=>{
    if(typing){ finishTyping(); }
    else{ advance(); }
  });

  document.querySelectorAll("#screen-investigate .hotspot").forEach(h=>{
    h.addEventListener("click", (e)=>{
      e.stopPropagation();
      examineClue(h.dataset.clue);
    });
  });
  $("btn-to-next-inv").addEventListener("click", advance);

  document.querySelectorAll(".stroke-hit").forEach(r=>{
    r.addEventListener("click", (e)=>{
      e.stopPropagation();
      revealStroke(r.dataset.region);
    });
  });
  $("btn-to-next-puzzle").addEventListener("click", advance);

  $("envelope").addEventListener("click", openEnvelope);
  $("btn-close-letter").addEventListener("click", advance);

  $("btn-examine-close").addEventListener("click", closeExamine);
  $("examine-overlay").addEventListener("click", (e)=>{
    if(e.target.id === "examine-overlay") closeExamine();
  });

  $("btn-evidence-toggle").addEventListener("click", ()=>{
    $("evidence-panel").classList.toggle("open");
  });

  $("btn-restart").addEventListener("click", ()=>{
    idx = 0;
    currentBg = "room";
    examined.clear();
    puzzleDone.clear();
    evidenceCollected.length = 0;
    renderEvidencePanel();
    showScreen("screen-title");
  });
});
