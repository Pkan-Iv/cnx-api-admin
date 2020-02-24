USE `ivconfigdb`;

DROP VIEW IF EXISTS `XM_Languages`;
CREATE ALGORITHM=MERGE VIEW `XM_Languages` AS SELECT
	`language`
FROM
	`Users`
GROUP BY
	`language`;

DROP VIEW IF EXISTS `XM_Users`;
CREATE ALGORITHM=MERGE VIEW `XM_Users` AS SELECT
	U.`id` AS `id`,
  W.`name` AS `whitelabel`,
  P.`name` AS `project`,
	U.`type` AS `type`,
  U.`display_name` AS `name`,
  U.`language` AS `language`
FROM
	`Users` U
JOIN
	`Projects` P
ON
	U.`project_ref` = P.`id`
JOIN
	.`Whitelabels` W
ON
	P.`whitelabel_ref` = W.`id`;
