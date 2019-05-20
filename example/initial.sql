

INSERT INTO framework.Task (title,description,ready,createdAt,updatedAt,email) VALUES 
('Fazer dever','lista com os deveres',0,'2019-05-17 16:18:38.000','2019-05-17 16:18:38.000','elvis.souza@vitta.me')
,('Fazer exercicios fisicos','lista com os exercicios',0,'2019-05-17 16:18:58.000','2019-05-17 16:18:58.000','elvis.souza@vitta.me')
,('Desenvolver software','lista com as funcionalidades',0,'2019-05-17 16:19:16.000','2019-05-17 16:19:16.000','elvis.souza@vitta.me');

INSERT INTO framework.SubTasks (TaskId,title,description,ready,createdAt,updatedAt) VALUES 
(1,'Matemamatica','',0,'2019-05-17 16:20:08.000','2019-05-17 16:20:08.000')
,(1,'Portugues','',0,'2019-05-17 16:20:15.000','2019-05-17 16:20:15.000')
,(1,'Historia','',0,'2019-05-17 16:20:20.000','2019-05-17 16:20:20.000')
,(2,'Correr','',0,'2019-05-17 16:20:30.000','2019-05-17 16:20:30.000')
,(2,'Caminhar','',0,'2019-05-17 16:20:33.000','2019-05-17 16:20:33.000')
,(2,'Levantamento de peso','',0,'2019-05-17 16:20:39.000','2019-05-17 16:20:39.000')
,(2,'Pedalar','',0,'2019-05-17 16:20:47.000','2019-05-17 16:20:47.000')
,(3,'Cadastrar produto','',0,'2019-05-17 16:21:03.000','2019-05-17 16:21:03.000')
,(3,'Editar produto','',0,'2019-05-17 16:21:06.000','2019-05-17 16:21:06.000')
,(3,'Remover produto','',0,'2019-05-17 16:21:09.000','2019-05-17 16:21:09.000');
INSERT INTO framework.SubTasks (TaskId,title,description,ready,createdAt,updatedAt) VALUES 
(3,'Buscar produto','',0,'2019-05-17 16:21:12.000','2019-05-17 16:21:12.000')
,(3,'Castrar foto','',0,'2019-05-17 16:21:28.000','2019-05-17 16:21:28.000')
,(3,'Vincular fotos com produto','',0,'2019-05-17 16:21:41.000','2019-05-17 16:21:41.000')
;