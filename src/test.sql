/*
Navicat MySQL Data Transfer
Source Server         : frontend
Source Server Version : 80018
Source Host           : localhost:3306
Source Database       : jphub
Target Server Type    : MYSQL
Target Server Version : 80018
File Encoding         : 65001
Date: 2021-06-25 21:10:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) NOT NULL,
  `mimetype` varchar(30) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename` (`filename`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of avatar
-- ----------------------------

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `moment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `moment_id` (`moment_id`),
  KEY `user_id` (`user_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('2', 'JS才是天下最高的语言', '1', '1', null, '2021-06-17 15:10:39', '2021-06-17 15:10:39');
INSERT INTO `comment` VALUES ('4', 'PHP才是天下最好的语言', '1', '1', null, '2021-06-17 16:56:47', '2021-06-17 16:56:47');
INSERT INTO `comment` VALUES ('6', 'PHP才是天下最好的语言', '1', '1', null, '2021-06-18 19:44:42', '2021-06-18 19:44:42');

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) NOT NULL,
  `mimetype` varchar(30) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `moment_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename` (`filename`),
  KEY `user_id` (`user_id`),
  KEY `moment_id` (`moment_id`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `file_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES ('11', 'W1m1wG_eOER1z8iXzEGW4_girl.jpg', 'image/jpeg', '572852', '1', '4', '2021-06-24 11:45:33', '2021-06-24 11:45:33');

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES ('1', '前端', '2021-06-19 21:07:15', '2021-06-19 21:07:15');
INSERT INTO `label` VALUES ('2', '文学', '2021-06-19 21:08:15', '2021-06-19 21:08:15');
INSERT INTO `label` VALUES ('3', '爱情', '2021-06-19 21:08:24', '2021-06-19 21:08:24');
INSERT INTO `label` VALUES ('4', '青春', '2021-06-19 21:08:31', '2021-06-19 21:08:31');
INSERT INTO `label` VALUES ('5', '大前端', '2021-06-19 22:53:49', '2021-06-19 22:53:49');
INSERT INTO `label` VALUES ('6', '后端', '2021-06-19 22:58:24', '2021-06-19 22:58:24');
INSERT INTO `label` VALUES ('7', '大数据', '2021-06-19 22:58:24', '2021-06-19 22:58:24');
INSERT INTO `label` VALUES ('8', '励志', '2021-06-20 14:05:24', '2021-06-20 14:05:24');
INSERT INTO `label` VALUES ('9', '生活', '2021-06-20 14:05:24', '2021-06-20 14:05:24');
INSERT INTO `label` VALUES ('11', '情感', '2021-06-22 01:26:34', '2021-06-22 01:26:34');

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of moment
-- ----------------------------
INSERT INTO `moment` VALUES ('1', '我说错了，C语言才是最好的语言~', '4', '2020-11-23 22:05:23', '2020-11-27 21:35:42');
INSERT INTO `moment` VALUES ('3', '曾几何时，他也好，她也好，都是这家伙的被害者。所以我才憎恶着。这个强求着所谓“大家”的世界。必须建立在牺牲某人之上才能成立的低劣的和平。以温柔和正义粉饰，明明是恶毒之物却登大雅之堂，随着时间的流逝越发凶恶，除欺瞒外别无其二的空虚的概念。过去和世界都是无法改变的。发生过的事情和所谓的“大家”都是无法改变的。但是，并不是说自己只能隶属于他们', '1', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('4', '不要告诉我你不需要保护，不要告诉我你不寂寞，知微，我只希望你，在走过黑夜的那个时辰，不要倔强的选择一个人。', '3', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('5', 'If you shed tears when you miss the sun, you also miss the stars.如果你因失去了太阳而流泪，那么你也将失去群星了。', '1', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('6', '在世间万物中我都发现了你，渺小时，你是阳光下一粒种子，伟大时，你隐身在高山海洋里。', '2', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('8', '限定目的，能使人生变得简洁。', '2', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('9', '翅膀长在你的肩上，太在乎别人对于飞行姿势的批评，所以你飞不起来', '4', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('10', '一个人至少拥有一个梦想，有一个理由去坚强。心若没有栖息的地方，到哪里都是在流浪。', '2', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('11', '不乱于心，不困于情。不畏将来，不念过往。如此，安好。', '3', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('12', '如果你给我的，和你给别人的是一样的，那我就不要了。', '3', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('13', '故事的开头总是这样，适逢其会，猝不及防。故事的结局总是这样，花开两朵，天各一方。', '2', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('14', '你不愿意种花，你说，我不愿看见它一点点凋落。是的，为了避免结束，你避免了一切开始。', '2', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('15', '你如果认识从前的我，也许你会原谅现在的我。', '4', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('16', '每一个不曾起舞的日子，都是对生命的辜负。', '2', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('17', '向来缘浅，奈何情深。', '2', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('18', '心之所向 素履以往 生如逆旅 一苇以航', '3', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('19', '生如夏花之绚烂，死如秋叶之静美。', '3', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('20', '答案很长，我准备用一生的时间来回答，你准备要听了吗？', '4', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('21', '因为爱过，所以慈悲；因为懂得，所以宽容。', '4', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('22', '我们听过无数的道理，却仍旧过不好这一生。', '1', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('23', '我来不及认真地年轻，待明白过来时，只能选择认真地老去。', '2', '2020-11-23 22:21:19', '2020-11-23 22:21:19');
INSERT INTO `moment` VALUES ('25', '今天删了代码，苦逼', '4', '2021-06-22 01:25:08', '2021-06-22 01:25:08');

-- ----------------------------
-- Table structure for moment_label
-- ----------------------------
DROP TABLE IF EXISTS `moment_label`;
CREATE TABLE `moment_label` (
  `moment_id` int(11) NOT NULL,
  `label_id` int(11) NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`moment_id`,`label_id`),
  KEY `label_id` (`label_id`),
  CONSTRAINT `moment_label_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_label_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of moment_label
-- ----------------------------
INSERT INTO `moment_label` VALUES ('1', '5', '2021-06-20 10:22:53', '2021-06-20 10:22:53');
INSERT INTO `moment_label` VALUES ('1', '6', '2021-06-20 10:22:53', '2021-06-20 10:22:53');
INSERT INTO `moment_label` VALUES ('1', '7', '2021-06-20 10:22:53', '2021-06-20 10:22:53');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `avatar_url` varchar(200) DEFAULT NULL,
  `creatAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'hjp', '202cb962ac59075b964b07152d234b70', null, '2021-06-16 21:27:35', '2021-06-16 21:27:35');
INSERT INTO `user` VALUES ('2', 'lqh', '202cb962ac59075b964b07152d234b70', null, '2021-06-16 21:30:17', '2021-06-16 21:30:17');
INSERT INTO `user` VALUES ('3', 'coderwhy', '202cb962ac59075b964b07152d234b70', null, '2021-06-16 21:30:20', '2021-06-16 21:30:20');
INSERT INTO `user` VALUES ('4', 'sanwitch', '202cb962ac59075b964b07152d234b70', 'http://localhost:8888/user/4/avatar', '2021-06-22 17:30:41', '2021-06-22 17:30:41');
