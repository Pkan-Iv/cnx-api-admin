USE `ivconfigdb`;

CREATE VIEW `XM_Users` AS SELECT
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
