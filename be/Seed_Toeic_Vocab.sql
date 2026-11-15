-- ==========================================================================
-- SEED SCRIPT: 1000+ TOEIC VOCABULARIES BY 50 TOPICS (LANGUAGE FARM)
-- ==========================================================================
USE LanguageFarmDb;
GO
SET NOCOUNT ON;
PRINT N'Bắt đầu nạp 50 chủ đề từ vựng TOEIC...';

-- Chủ đề 1: Văn phòng (Office) (24 từ)
DECLARE @LessonId_1 INT;
SELECT @LessonId_1 = Id FROM dbo.Lessons WHERE Title = N'Văn phòng (Office)' AND LanguageCode = 'en';
IF @LessonId_1 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Văn phòng (Office)', 'en', 'TOEIC 450', 3, NULL, 0);
    SET @LessonId_1 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Appointment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Appointment', N'/əˈpɔɪntmənt/', N'/əˈpɔɪntmənt/', N'noun', N'Cuộc hẹn', N'I have an appointment with the manager at 10 a.m.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Briefcase')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Briefcase', N'/ˈbriːf.keɪs/', N'/ˈbriːf.keɪs/', N'noun', N'Cặp tài liệu', N'He carried his documents in a leather briefcase.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Conference')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Conference', N'/ˈkɒn.fər.əns/', N'/ˈkɒn.fər.əns/', N'noun', N'Hội nghị', N'The annual conference will be held next week.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Desk')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Desk', N'/desk/', N'/desk/', N'noun', N'Bàn làm việc', N'She left her notebook on the desk.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Employee')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Employee', N'/ɪmˈplɔɪ.iː/', N'/ɪmˈplɔɪ.iː/', N'noun', N'Nhân viên', N'Our company has over 500 employees.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Employer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Employer', N'/ɪmˈplɔɪ.ər/', N'/ɪmˈplɔɪ.ər/', N'noun', N'Người tuyển dụng', N'The employer offered her a generous salary.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'File')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'File', N'/faɪl/', N'/faɪl/', N'noun', N'Tệp tài liệu', N'Please save the document in this file.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Fax')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Fax', N'/fæks/', N'/fæks/', N'noun', N'Máy fax', N'Could you send this document via fax?', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Keyboard')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Keyboard', N'/ˈkiː.bɔːd/', N'/ˈkiː.bɔːd/', N'noun', N'Bàn phím', N'The keyboard on my laptop isn’t working.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Meeting')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Meeting', N'/ˈmiː.tɪŋ/', N'/ˈmiː.tɪŋ/', N'noun', N'Cuộc họp', N'The team has a meeting every Monday morning.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Office')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Office', N'/ˈɒf.ɪs/', N'/ˈɒf.ɪs/', N'noun', N'Văn phòng', N'She works in a large office downtown.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Paperclip')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Paperclip', N'/ˈpeɪ.pə.klɪp/', N'/ˈpeɪ.pə.klɪp/', N'noun', N'Kẹp giấy', N'Use a paperclip to keep these pages together.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Printer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Printer', N'/ˈprɪn.tər/', N'/ˈprɪn.tər/', N'noun', N'Máy in', N'The printer is out of paper again.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Schedule')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Schedule', N'/ˈʃedʒ.uːl/', N'/ˈʃedʒ.uːl/', N'noun', N'Lịch trình', N'Check the schedule to confirm the meeting time.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Supervisor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Supervisor', N'/ˈsuː.pə.vaɪ.zər/', N'/ˈsuː.pə.vaɪ.zər/', N'noun', N'Người giám sát', N'My supervisor is very supportive and helpful.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Task')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Task', N'/tæsk/', N'/tæsk/', N'noun', N'Nhiệm vụ', N'Each task must be completed by the deadline.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Telephone')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Telephone', N'/ˈtel.ɪ.fəʊn/', N'/ˈtel.ɪ.fəʊn/', N'noun', N'Điện thoại bàn', N'She answered the telephone after two rings.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Workspace')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Workspace', N'/ˈwɜːk.speɪs/', N'/ˈwɜːk.speɪs/', N'noun', N'Không gian làm việc', N'His workspace is always clean and organized.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Document')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Document', N'/ˈdɒk.jə.mənt/', N'/ˈdɒk.jə.mənt/', N'noun', N'Tài liệu', N'Please print the document for the meeting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Projector')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Projector', N'/prəˈdʒek.tər/', N'/prəˈdʒek.tər/', N'noun', N'Máy chiếu', N'The projector is used for presentations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Deadline')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Deadline', N'/ˈded.laɪn/', N'/ˈded.laɪn/', N'noun', N'Hạn chót', N'We have to meet the deadline for this project.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Receptionist')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Receptionist', N'/rɪˈsep.ʃən.ɪst/', N'/rɪˈsep.ʃən.ɪst/', N'noun', N'Lễ tân', N'The receptionist greeted us with a warm smile.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Stationery')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Stationery', N'/ˈsteɪ.ʃən.ər.i/', N'/ˈsteɪ.ʃən.ər.i/', N'noun', N'Văn phòng phẩm', N'We need to order more stationery for the office.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_1 AND Word = N'Memo')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_1, N'Memo', N'/ˈmem.əʊ/', N'/ˈmem.əʊ/', N'noun', N'Thông báo nội bộ', N'I sent a memo to all staff regarding the changes.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_1 AND Prompt = N'Từ "Deadline" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_1, N'Từ "Deadline" có nghĩa là gì?', NULL, N'["Bàn phím", "Nhân viên", "Máy fax", "Hạn chót"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_1 AND Prompt = N'Từ "Desk" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_1, N'Từ "Desk" có nghĩa là gì?', NULL, N'["Máy chiếu", "Người giám sát", "Cặp tài liệu", "Bàn làm việc"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_1 AND Prompt = N'Từ "Appointment" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_1, N'Từ "Appointment" có nghĩa là gì?', NULL, N'["Bàn phím", "Hạn chót", "Không gian làm việc", "Cuộc hẹn"]', 3);

-- Chủ đề 2: Nhân sự (Human Resources) (24 từ)
DECLARE @LessonId_2 INT;
SELECT @LessonId_2 = Id FROM dbo.Lessons WHERE Title = N'Nhân sự (Human Resources)' AND LanguageCode = 'en';
IF @LessonId_2 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Nhân sự (Human Resources)', 'en', 'TOEIC 450', 4, NULL, 0);
    SET @LessonId_2 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Applicant')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Applicant', N'/ˈæp.lɪ.kənt/', N'/ˈæp.lɪ.kənt/', N'noun', N'Người nộp đơn, ứng viên', N'The company received over 100 applicants for the position.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Recruitment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Recruitment', N'/rɪˈkruːt.mənt/', N'/rɪˈkruːt.mənt/', N'noun', N'Tuyển dụng', N'The HR department handles all recruitment activities.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Resume')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Resume', N'/ˈrez.juː.meɪ/', N'/ˈrez.juː.meɪ/', N'noun', N'Sơ yếu lý lịch', N'Please attach your resume to the application.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Interview')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Interview', N'/ˈɪn.tə.vjuː/', N'/ˈɪn.tə.vjuː/', N'noun', N'Phỏng vấn', N'The interview went well, and she got the job.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Reference')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Reference', N'/ˈref.ər.əns/', N'/ˈref.ər.əns/', N'noun', N'Người tham khảo', N'You should provide two references with your job application.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Contract')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Contract', N'/ˈkɒn.trækt/', N'/ˈkɒn.trækt/', N'noun', N'Hợp đồng', N'The new employee signed a one-year contract.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Orientation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Orientation', N'/ˌɔːr.i.enˈteɪ.ʃən/', N'/ˌɔːr.i.enˈteɪ.ʃən/', N'noun', N'Buổi định hướng', N'All new staff must attend the orientation session.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Promotion')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Promotion', N'/prəˈməʊ.ʃən/', N'/prəˈməʊ.ʃən/', N'noun', N'Sự thăng chức', N'She received a promotion to the position of manager.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Salary')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Salary', N'/ˈsæl.ər.i/', N'/ˈsæl.ər.i/', N'noun', N'Tiền lương', N'The company offers a competitive salary package.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Bonus')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Bonus', N'/ˈbəʊ.nəs/', N'/ˈbəʊ.nəs/', N'noun', N'Thưởng', N'Employees will receive a year-end bonus based on performance.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Training')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Training', N'/ˈtreɪ.nɪŋ/', N'/ˈtreɪ.nɪŋ/', N'noun', N'Đào tạo', N'All staff are required to complete safety training.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Probation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Probation', N'/prəˈbeɪ.ʃən/', N'/prəˈbeɪ.ʃən/', N'noun', N'Thời gian thử việc', N'The new hires are currently on a three-month probation period.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Performance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Performance', N'/pəˈfɔː.məns/', N'/pəˈfɔː.məns/', N'noun', N'Hiệu suất', N'Regular performance reviews are conducted every quarter.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Employee')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Employee', N'/ɪmˈplɔɪ.iː/', N'/ɪmˈplɔɪ.iː/', N'noun', N'Nhân viên', N'The company has 300 full-time employees.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Employer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Employer', N'/ɪmˈplɔɪ.ər/', N'/ɪmˈplɔɪ.ər/', N'noun', N'Người tuyển dụng', N'The employer must provide a safe working environment.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Benefits')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Benefits', N'/ˈben.ɪ.fɪts/', N'/ˈben.ɪ.fɪts/', N'noun', N'Phúc lợi', N'Health insurance is one of the employee benefits.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Termination')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Termination', N'/ˌtɜː.mɪˈneɪ.ʃən/', N'/ˌtɜː.mɪˈneɪ.ʃən/', N'noun', N'Chấm dứt (hợp đồng lao động)', N'The termination of his contract was unexpected.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Workforce')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Workforce', N'/ˈwɜːk.fɔːs/', N'/ˈwɜːk.fɔːs/', N'noun', N'Lực lượng lao động', N'The company is planning to expand its workforce next year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Leave')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Leave', N'/liːv/', N'/liːv/', N'noun', N'Nghỉ phép', N'She is currently on maternity leave.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Vacancy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Vacancy', N'/ˈveɪ.kən.si/', N'/ˈveɪ.kən.si/', N'noun', N'Vị trí trống', N'There’s a vacancy in the marketing department.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Overtime')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Overtime', N'/ˈəʊ.və.taɪm/', N'/ˈəʊ.və.taɪm/', N'noun', N'Làm thêm giờ', N'Employees who work overtime will be paid extra.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Retirement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Retirement', N'/rɪˈtaɪə.mənt/', N'/rɪˈtaɪə.mənt/', N'noun', N'Nghỉ hưu', N'He is planning for his retirement in five years.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Dispute')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Dispute', N'/dɪˈspjuːt/', N'/dɪˈspjuːt/', N'noun', N'Tranh chấp', N'The union resolved the dispute with the management team.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_2 AND Word = N'Diversity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_2, N'Diversity', N'/daɪˈvɜː.sɪ.ti/', N'/daɪˈvɜː.sɪ.ti/', N'noun', N'Sự đa dạng', N'The company values diversity in its workforce.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_2 AND Prompt = N'Từ "Diversity" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_2, N'Từ "Diversity" có nghĩa là gì?', NULL, N'["Chấm dứt (hợp đồng lao động)", "Phúc lợi", "Sự đa dạng", "Người nộp đơn, ứng viên"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_2 AND Prompt = N'Từ "Bonus" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_2, N'Từ "Bonus" có nghĩa là gì?', NULL, N'["Thưởng", "Hiệu suất", "Nghỉ phép", "Chấm dứt (hợp đồng lao động)"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_2 AND Prompt = N'Từ "Recruitment" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_2, N'Từ "Recruitment" có nghĩa là gì?', NULL, N'["Lực lượng lao động", "Tuyển dụng", "Nhân viên", "Phúc lợi"]', 1);

-- Chủ đề 3: Kinh doanh (Business) (25 từ)
DECLARE @LessonId_3 INT;
SELECT @LessonId_3 = Id FROM dbo.Lessons WHERE Title = N'Kinh doanh (Business)' AND LanguageCode = 'en';
IF @LessonId_3 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Kinh doanh (Business)', 'en', 'TOEIC 450', 5, NULL, 0);
    SET @LessonId_3 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Agreement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Agreement', N'/əˈɡriː.mənt/', N'/əˈɡriː.mənt/', N'noun', N'Thỏa thuận', N'Both parties signed the agreement yesterday.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Budget')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Budget', N'/ˈbʌdʒ.ɪt/', N'/ˈbʌdʒ.ɪt/', N'noun', N'Ngân sách', N'The marketing department exceeded its budget this quarter.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Client')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Client', N'/ˈklaɪ.ənt/', N'/ˈklaɪ.ənt/', N'noun', N'Khách hàng', N'The company provides excellent service to its clients.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Competitor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Competitor', N'/kəmˈpet.ɪ.tər/', N'/kəmˈpet.ɪ.tər/', N'noun', N'Đối thủ cạnh tranh', N'Our biggest competitor just launched a new product.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Contract')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Contract', N'/ˈkɒn.trækt/', N'/ˈkɒn.trækt/', N'noun', N'Hợp đồng', N'The contract is valid for two years.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Cooperation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Cooperation', N'/kəʊˌɒp.ərˈeɪ.ʃən/', N'/kəʊˌɒp.ərˈeɪ.ʃən/', N'noun', N'Sự hợp tác', N'The project requires close cooperation between the two teams.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Deal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Deal', N'/diːl/', N'/diːl/', N'adjective', N'Thỏa thuận, giao dịch', N'They closed a big deal with a Japanese company.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Delivery')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Delivery', N'/dɪˈlɪv.ər.i/', N'/dɪˈlɪv.ər.i/', N'noun', N'Giao hàng', N'The delivery is expected to arrive tomorrow.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Demand')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Demand', N'/dɪˈmɑːnd/', N'/dɪˈmɑːnd/', N'noun', N'Nhu cầu', N'There is a high demand for electric vehicles in the market.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Entrepreneur')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Entrepreneur', N'/ˌɒn.trə.prəˈnɜːr/', N'/ˌɒn.trə.prəˈnɜːr/', N'noun', N'Doanh nhân', N'Many entrepreneurs start small businesses before expanding.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Invoice')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Invoice', N'/ˈɪn.vɔɪs/', N'/ˈɪn.vɔɪs/', N'noun', N'Hóa đơn', N'Please send us the invoice for the last order.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Investment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Investment', N'/ɪnˈvest.mənt/', N'/ɪnˈvest.mənt/', N'noun', N'Đầu tư', N'They made a significant investment in real estate.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Market')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Market', N'/ˈmɑː.kɪt/', N'/ˈmɑː.kɪt/', N'noun', N'Thị trường', N'The company is targeting the European market for its products.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Partnership')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Partnership', N'/ˈpɑːt.nə.ʃɪp/', N'/ˈpɑːt.nə.ʃɪp/', N'noun', N'Quan hệ đối tác', N'They established a partnership with a local distributor.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Profit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Profit', N'/ˈprɒf.ɪt/', N'/ˈprɒf.ɪt/', N'noun', N'Lợi nhuận', N'The company reported a 20% increase in profit this year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Proposal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Proposal', N'/prəˈpəʊ.zəl/', N'/prəˈpəʊ.zəl/', N'adjective', N'Đề xuất', N'The board is reviewing a new proposal for expansion.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Revenue')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Revenue', N'/ˈrev.ən.juː/', N'/ˈrev.ən.juː/', N'noun', N'Doanh thu', N'The company’s annual revenue exceeded $10 million.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Strategy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Strategy', N'/ˈstræt.ə.dʒi/', N'/ˈstræt.ə.dʒi/', N'noun', N'Chiến lược', N'We need a new marketing strategy to attract more customers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Supplier')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Supplier', N'/səˈplaɪ.ər/', N'/səˈplaɪ.ər/', N'noun', N'Nhà cung cấp', N'The company switched to a more reliable supplier.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Target')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Target', N'/ˈtɑː.ɡɪt/', N'/ˈtɑː.ɡɪt/', N'noun', N'Mục tiêu', N'Our sales target for this month is $50,000.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Transaction')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Transaction', N'/trænˈzæk.ʃən/', N'/trænˈzæk.ʃən/', N'noun', N'Giao dịch', N'The transaction was successfully processed.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Venture')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Venture', N'/ˈven.tʃər/', N'/ˈven.tʃər/', N'noun', N'Dự án kinh doanh mạo hiểm', N'They started a new venture in renewable energy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Wholesale')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Wholesale', N'/ˈhəʊl.seɪl/', N'/ˈhəʊl.seɪl/', N'noun', N'Bán buôn', N'The company focuses on wholesale distribution of its products.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Logistics')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Logistics', N'/ləˈdʒɪs.tɪks/', N'/ləˈdʒɪs.tɪks/', N'noun', N'Hậu cần, vận chuyển', N'Logistics is a key factor in ensuring timely delivery.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_3 AND Word = N'Advertisement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_3, N'Advertisement', N'/ˌæd.vɜːˈtaɪz.mənt/', N'/ˌæd.vɜːˈtaɪz.mənt/', N'noun', N'Quảng cáo', N'The company spent millions on a TV advertisement campaign.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_3 AND Prompt = N'Từ "Supplier" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_3, N'Từ "Supplier" có nghĩa là gì?', NULL, N'["Nhà cung cấp", "Giao hàng", "Dự án kinh doanh mạo hiểm", "Lợi nhuận"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_3 AND Prompt = N'Từ "Budget" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_3, N'Từ "Budget" có nghĩa là gì?', NULL, N'["Ngân sách", "Bán buôn", "Thỏa thuận, giao dịch", "Nhu cầu"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_3 AND Prompt = N'Từ "Target" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_3, N'Từ "Target" có nghĩa là gì?', NULL, N'["Khách hàng", "Mục tiêu", "Bán buôn", "Quảng cáo"]', 1);

-- Chủ đề 4: Tài chính (Finance) (26 từ)
DECLARE @LessonId_4 INT;
SELECT @LessonId_4 = Id FROM dbo.Lessons WHERE Title = N'Tài chính (Finance)' AND LanguageCode = 'en';
IF @LessonId_4 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Tài chính (Finance)', 'en', 'TOEIC 450', 6, NULL, 0);
    SET @LessonId_4 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Account')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Account', N'/əˈkaʊnt/', N'/əˈkaʊnt/', N'noun', N'Tài khoản', N'I opened a savings account at the bank.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Audit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Audit', N'/ˈɔː.dɪt/', N'/ˈɔː.dɪt/', N'noun', N'Kiểm toán', N'The company conducts an annual audit of its finances.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Balance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Balance', N'/ˈbæl.əns/', N'/ˈbæl.əns/', N'noun', N'Số dư, cân đối', N'Please check your balance before making the transfer.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Bankrupt')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Bankrupt', N'/ˈbæŋ.krʌpt/', N'/ˈbæŋ.krʌpt/', N'noun', N'Phá sản', N'The company went bankrupt due to poor management.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Budget')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Budget', N'/ˈbʌdʒ.ɪt/', N'/ˈbʌdʒ.ɪt/', N'noun', N'Ngân sách', N'We need to cut costs to stay within the budget.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Capital')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Capital', N'/ˈkæp.ɪ.təl/', N'/ˈkæp.ɪ.təl/', N'adjective', N'Vốn', N'The company raised more capital to expand its operations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Credit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Credit', N'/ˈkred.ɪt/', N'/ˈkred.ɪt/', N'noun', N'Tín dụng', N'He was approved for a credit card with a high limit.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Currency')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Currency', N'/ˈkʌr.ən.si/', N'/ˈkʌr.ən.si/', N'noun', N'Tiền tệ', N'The US dollar is a widely used currency in global trade.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Debt')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Debt', N'/det/', N'/det/', N'noun', N'Nợ', N'He is struggling to pay off his debt.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Deposit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Deposit', N'/dɪˈpɒz.ɪt/', N'/dɪˈpɒz.ɪt/', N'noun', N'Tiền gửi, tiền đặt cọc', N'You need to make a deposit to secure the booking.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Dividend')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Dividend', N'/ˈdɪv.ɪ.dend/', N'/ˈdɪv.ɪ.dend/', N'noun', N'Cổ tức', N'The shareholders received a generous dividend this year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Expense')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Expense', N'/ɪkˈspens/', N'/ɪkˈspens/', N'noun', N'Chi phí', N'Rent is the largest expense for most small businesses.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Fund')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Fund', N'/fʌnd/', N'/fʌnd/', N'noun', N'Quỹ, nguồn vốn', N'The company set up a fund to support new startups.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Inflation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Inflation', N'/ɪnˈfleɪ.ʃən/', N'/ɪnˈfleɪ.ʃən/', N'noun', N'Lạm phát', N'Rising inflation has increased the cost of living.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Interest')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Interest', N'/ˈɪn.trɪst/', N'/ˈɪn.trɪst/', N'noun', N'Lãi suất', N'The bank offers a low interest rate on loans.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Investment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Investment', N'/ɪnˈvest.mənt/', N'/ɪnˈvest.mənt/', N'noun', N'Sự đầu tư', N'Real estate is a popular investment option.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Loan')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Loan', N'/ləʊn/', N'/ləʊn/', N'noun', N'Khoản vay', N'She took out a loan to buy a new car.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Mortgage')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Mortgage', N'/ˈmɔː.ɡɪdʒ/', N'/ˈmɔː.ɡɪdʒ/', N'noun', N'Thế chấp', N'They applied for a mortgage to buy their first home.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Overdraft')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Overdraft', N'/ˈəʊ.və.drɑːft/', N'/ˈəʊ.və.drɑːft/', N'noun', N'Thấu chi', N'He has an overdraft limit of $5,000 on his bank account.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Profit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Profit', N'/ˈprɒf.ɪt/', N'/ˈprɒf.ɪt/', N'noun', N'Lợi nhuận', N'The company’s profit increased by 20% last year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Revenue')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Revenue', N'/ˈrev.ən.juː/', N'/ˈrev.ən.juː/', N'noun', N'Doanh thu', N'The company reported a record high in revenue this quarter.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Stock')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Stock', N'/stɒk/', N'/stɒk/', N'noun', N'Cổ phiếu, hàng tồn kho', N'He invested in technology stocks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Tax')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Tax', N'/tæks/', N'/tæks/', N'noun', N'Thuế', N'The government announced new tax regulations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Transaction')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Transaction', N'/trænˈzæk.ʃən/', N'/trænˈzæk.ʃən/', N'noun', N'Giao dịch', N'The transaction was completed within minutes.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Valuation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Valuation', N'/ˌvæl.juˈeɪ.ʃən/', N'/ˌvæl.juˈeɪ.ʃən/', N'noun', N'Sự định giá', N'The valuation of the property has increased significantly.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_4 AND Word = N'Withdraw')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_4, N'Withdraw', N'/wɪðˈdrɔː/', N'/wɪðˈdrɔː/', N'noun', N'Rút tiền', N'She withdrew $500 from her savings account.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_4 AND Prompt = N'Từ "Transaction" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_4, N'Từ "Transaction" có nghĩa là gì?', NULL, N'["Vốn", "Giao dịch", "Quỹ, nguồn vốn", "Chi phí"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_4 AND Prompt = N'Từ "Bankrupt" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_4, N'Từ "Bankrupt" có nghĩa là gì?', NULL, N'["Tiền tệ", "Phá sản", "Thấu chi", "Thế chấp"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_4 AND Prompt = N'Từ "Loan" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_4, N'Từ "Loan" có nghĩa là gì?', NULL, N'["Thuế", "Doanh thu", "Quỹ, nguồn vốn", "Khoản vay"]', 3);

-- Chủ đề 5: Ngân hàng (Banking) (24 từ)
DECLARE @LessonId_5 INT;
SELECT @LessonId_5 = Id FROM dbo.Lessons WHERE Title = N'Ngân hàng (Banking)' AND LanguageCode = 'en';
IF @LessonId_5 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Ngân hàng (Banking)', 'en', 'TOEIC 450', 7, NULL, 0);
    SET @LessonId_5 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Account')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Account', N'/əˈkaʊnt/', N'/əˈkaʊnt/', N'noun', N'Tài khoản', N'I opened a savings account at the bank.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'ATM')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'ATM', N'/ˌeɪ.tiːˈem/', N'/ˌeɪ.tiːˈem/', N'noun', N'Máy rút tiền tự động', N'I withdrew cash from the ATM near my office.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Banknote')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Banknote', N'/ˈbæŋk.nəʊt/', N'/ˈbæŋk.nəʊt/', N'noun', N'Tiền giấy', N'He handed over a $50 banknote at the counter.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Branch')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Branch', N'/brɑːntʃ/', N'/brɑːntʃ/', N'noun', N'Chi nhánh ngân hàng', N'The new branch will open next month in the city center.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Cash')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Cash', N'/kæʃ/', N'/kæʃ/', N'noun', N'Tiền mặt', N'Do you prefer to pay by cash or card?', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Cheque')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Cheque', N'/tʃek/', N'/tʃek/', N'noun', N'Séc', N'She wrote a cheque for $500 to pay the rent.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Deposit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Deposit', N'/dɪˈpɒz.ɪt/', N'/dɪˈpɒz.ɪt/', N'noun', N'Tiền gửi, tiền đặt cọc', N'You need to make a deposit of $200 to open this account.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Interest rate')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Interest rate', N'/ˈɪn.trəst ˌreɪt/', N'/ˈɪn.trəst ˌreɪt/', N'verb', N'Lãi suất', N'The bank offers a competitive interest rate for savings accounts.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Loan')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Loan', N'/ləʊn/', N'/ləʊn/', N'noun', N'Khoản vay', N'He applied for a loan to purchase a car.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Mortgage')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Mortgage', N'/ˈmɔː.ɡɪdʒ/', N'/ˈmɔː.ɡɪdʒ/', N'noun', N'Thế chấp', N'They took out a mortgage to buy their new home.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Overdraft')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Overdraft', N'/ˈəʊ.və.drɑːft/', N'/ˈəʊ.və.drɑːft/', N'noun', N'Thấu chi', N'The bank allowed a $500 overdraft on my account.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Savings account')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Savings account', N'/ˈseɪ.vɪŋz əˌkaʊnt/', N'/ˈseɪ.vɪŋz əˌkaʊnt/', N'noun', N'Tài khoản tiết kiệm', N'She transferred money from her savings account to her checking account.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Checking account')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Checking account', N'/ˈtʃek.ɪŋ əˌkaʊnt/', N'/ˈtʃek.ɪŋ əˌkaʊnt/', N'noun', N'Tài khoản vãng lai', N'Most of my bills are paid through my checking account.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Statement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Statement', N'/ˈsteɪt.mənt/', N'/ˈsteɪt.mənt/', N'noun', N'Sao kê', N'I received my monthly bank statement yesterday.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Teller')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Teller', N'/ˈtel.ər/', N'/ˈtel.ər/', N'noun', N'Giao dịch viên', N'The teller helped me deposit the cash into my account.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Transaction')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Transaction', N'/trænˈzæk.ʃən/', N'/trænˈzæk.ʃən/', N'noun', N'Giao dịch', N'All transactions are recorded in your account history.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Withdrawal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Withdrawal', N'/wɪðˈdrɔː.əl/', N'/wɪðˈdrɔː.əl/', N'adjective', N'Sự rút tiền', N'He made a withdrawal of $300 from the ATM.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Currency')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Currency', N'/ˈkʌr.ən.si/', N'/ˈkʌr.ən.si/', N'noun', N'Tiền tệ', N'The exchange rate for foreign currency has increased today.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Credit card')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Credit card', N'/ˈkred.ɪt ˌkɑːd/', N'/ˈkred.ɪt ˌkɑːd/', N'noun', N'Thẻ tín dụng', N'She used her credit card to pay for the purchase.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Debit card')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Debit card', N'/ˈdeb.ɪt ˌkɑːd/', N'/ˈdeb.ɪt ˌkɑːd/', N'noun', N'Thẻ ghi nợ', N'I prefer using my debit card for everyday expenses.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Exchange rate')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Exchange rate', N'/ɪksˈtʃeɪndʒ ˌreɪt/', N'/ɪksˈtʃeɪndʒ ˌreɪt/', N'verb', N'Tỷ giá hối đoái', N'The exchange rate for USD to VND is quite favorable today.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Fee')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Fee', N'/fiː/', N'/fiː/', N'noun', N'Phí', N'The bank charges a small fee for international transactions.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Loan officer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Loan officer', N'/ləʊn ˈɒf.ɪ.sər/', N'/ləʊn ˈɒf.ɪ.sər/', N'noun', N'Nhân viên tín dụng', N'The loan officer reviewed my application for a business loan.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_5 AND Word = N'Online banking')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_5, N'Online banking', N'/ˌɒn.laɪn ˈbæŋ.kɪŋ/', N'/ˌɒn.laɪn ˈbæŋ.kɪŋ/', N'noun', N'Ngân hàng trực tuyến', N'I use online banking to transfer money between accounts.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_5 AND Prompt = N'Từ "Checking account" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_5, N'Từ "Checking account" có nghĩa là gì?', NULL, N'["Ngân hàng trực tuyến", "Sao kê", "Séc", "Tài khoản vãng lai"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_5 AND Prompt = N'Từ "Account" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_5, N'Từ "Account" có nghĩa là gì?', NULL, N'["Tiền giấy", "Phí", "Tài khoản", "Khoản vay"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_5 AND Prompt = N'Từ "Fee" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_5, N'Từ "Fee" có nghĩa là gì?', NULL, N'["Tiền tệ", "Chi nhánh ngân hàng", "Phí", "Tiền giấy"]', 2);

-- Chủ đề 6: Marketing & Quảng cáo (Marketing & Advertising) (24 từ)
DECLARE @LessonId_6 INT;
SELECT @LessonId_6 = Id FROM dbo.Lessons WHERE Title = N'Marketing & Quảng cáo (Marketing & Advertising)' AND LanguageCode = 'en';
IF @LessonId_6 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Marketing & Quảng cáo (Marketing & Advertising)', 'en', 'TOEIC 450', 8, 1, 2);
    SET @LessonId_6 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Advertisement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Advertisement', N'/ˌæd.vəˈtaɪz.mənt/', N'/ˌæd.vəˈtaɪz.mənt/', N'noun', N'Quảng cáo', N'The company spent millions on a TV advertisement.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Brand')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Brand', N'/brænd/', N'/brænd/', N'noun', N'Thương hiệu', N'Coca-Cola is a global brand.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Campaign')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Campaign', N'/kæmˈpeɪn/', N'/kæmˈpeɪn/', N'noun', N'Chiến dịch quảng cáo', N'The new marketing campaign focuses on younger consumers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Consumer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Consumer', N'/kənˈsjuː.mər/', N'/kənˈsjuː.mər/', N'noun', N'Người tiêu dùng', N'Companies need to understand their consumers’ needs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Market')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Market', N'/ˈmɑː.kɪt/', N'/ˈmɑː.kɪt/', N'noun', N'Thị trường', N'The company is trying to enter the Asian market.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Target audience')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Target audience', N'/ˈtɑː.ɡɪt ˈɔː.di.əns/', N'/ˈtɑː.ɡɪt ˈɔː.di.əns/', N'noun', N'Khách hàng mục tiêu', N'The target audience for this product is teenagers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Promotion')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Promotion', N'/prəˈməʊ.ʃən/', N'/prəˈməʊ.ʃən/', N'noun', N'Khuyến mãi', N'They are offering a special promotion for the holiday season.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Slogan')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Slogan', N'/ˈsləʊ.ɡən/', N'/ˈsləʊ.ɡən/', N'noun', N'Khẩu hiệu', N'The brand’s new slogan is “Just Do It”.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Commercial')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Commercial', N'/kəˈmɜː.ʃəl/', N'/kəˈmɜː.ʃəl/', N'adjective', N'Quảng cáo trên TV/radio', N'The company aired a new commercial during the Super Bowl.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Competitor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Competitor', N'/kəmˈpet.ɪ.tər/', N'/kəmˈpet.ɪ.tər/', N'noun', N'Đối thủ cạnh tranh', N'Our main competitor is launching a similar product.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Content')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Content', N'/ˈkɒn.tent/', N'/ˈkɒn.tent/', N'noun', N'Nội dung', N'High-quality content is essential for social media marketing.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Strategy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Strategy', N'/ˈstræt.ə.dʒi/', N'/ˈstræt.ə.dʒi/', N'noun', N'Chiến lược', N'The company’s marketing strategy aims to boost brand awareness.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Public relations')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Public relations', N'/ˌpʌb.lɪk rɪˈleɪ.ʃənz/', N'/ˌpʌb.lɪk rɪˈleɪ.ʃənz/', N'noun', N'Quan hệ công chúng', N'Good public relations can improve a company’s reputation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Logo')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Logo', N'/ˈləʊ.ɡəʊ/', N'/ˈləʊ.ɡəʊ/', N'noun', N'Biểu trưng (logo)', N'The brand redesigned its logo to attract younger customers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Digital marketing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Digital marketing', N'/ˈdɪdʒ.ɪ.təl ˈmɑː.kɪ.tɪŋ/', N'/ˈdɪdʒ.ɪ.təl ˈmɑː.kɪ.tɪŋ/', N'noun', N'Tiếp thị số', N'Digital marketing is now essential for reaching global audiences.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Social media')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Social media', N'/ˌsəʊ.ʃəl ˈmiː.di.ə/', N'/ˌsəʊ.ʃəl ˈmiː.di.ə/', N'noun', N'Mạng xã hội', N'The campaign gained traction through social media platforms.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Endorsement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Endorsement', N'/ɪnˈdɔːs.mənt/', N'/ɪnˈdɔːs.mənt/', N'noun', N'Sự chứng thực (người nổi tiếng)', N'The product received a celebrity endorsement from a famous actor.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Banner')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Banner', N'/ˈbæn.ər/', N'/ˈbæn.ər/', N'noun', N'Biểu ngữ quảng cáo', N'They placed a large banner ad on the website’s homepage.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Survey')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Survey', N'/ˈsɜː.veɪ/', N'/ˈsɜː.veɪ/', N'noun', N'Khảo sát', N'A customer survey was conducted to improve the service.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Market research')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Market research', N'/ˈmɑː.kɪt rɪˈsɜːtʃ/', N'/ˈmɑː.kɪt rɪˈsɜːtʃ/', N'noun', N'Nghiên cứu thị trường', N'Market research helps companies understand consumer preferences.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Branding')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Branding', N'/ˈbræn.dɪŋ/', N'/ˈbræn.dɪŋ/', N'noun', N'Xây dựng thương hiệu', N'Strong branding sets a company apart from its competitors.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Keyword')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Keyword', N'/ˈkiː.wɜːd/', N'/ˈkiː.wɜːd/', N'noun', N'Từ khóa', N'SEO strategies often focus on specific keywords.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Conversion rate')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Conversion rate', N'/kənˈvɜː.ʃən reɪt/', N'/kənˈvɜː.ʃən reɪt/', N'verb', N'Tỷ lệ chuyển đổi', N'Increasing the conversion rate is the main goal of this campaign.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_6 AND Word = N'Viral')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_6, N'Viral', N'/ˈvaɪə.rəl/', N'/ˈvaɪə.rəl/', N'adjective', N'Lan truyền', N'The video went viral and reached millions of viewers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_6 AND Prompt = N'Từ "Market research" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_6, N'Từ "Market research" có nghĩa là gì?', NULL, N'["Nghiên cứu thị trường", "Biểu ngữ quảng cáo", "Thị trường", "Đối thủ cạnh tranh"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_6 AND Prompt = N'Từ "Advertisement" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_6, N'Từ "Advertisement" có nghĩa là gì?', NULL, N'["Mạng xã hội", "Đối thủ cạnh tranh", "Sự chứng thực (người nổi tiếng)", "Quảng cáo"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_6 AND Prompt = N'Từ "Keyword" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_6, N'Từ "Keyword" có nghĩa là gì?', NULL, N'["Nghiên cứu thị trường", "Từ khóa", "Quảng cáo trên TV/radio", "Xây dựng thương hiệu"]', 1);

-- Chủ đề 7: Khách sạn (Hotel) (24 từ)
DECLARE @LessonId_7 INT;
SELECT @LessonId_7 = Id FROM dbo.Lessons WHERE Title = N'Khách sạn (Hotel)' AND LanguageCode = 'en';
IF @LessonId_7 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Khách sạn (Hotel)', 'en', 'TOEIC 450', 9, 1, 2);
    SET @LessonId_7 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Accommodation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Accommodation', N'/əˌkɒm.əˈdeɪ.ʃən/', N'/əˌkɒm.əˈdeɪ.ʃən/', N'noun', N'Chỗ ở, nơi lưu trú', N'The hotel offers luxurious accommodation for its guests.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Reservation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Reservation', N'/ˌrez.əˈveɪ.ʃən/', N'/ˌrez.əˈveɪ.ʃən/', N'noun', N'Đặt phòng', N'I made a reservation for a double room at the hotel.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Check-in')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Check-in', N'/ˈtʃek.ɪn/', N'/ˈtʃek.ɪn/', N'noun', N'Thủ tục nhận phòng', N'Guests are required to check-in at 3 PM.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Check-out')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Check-out', N'/ˈtʃek.aʊt/', N'/ˈtʃek.aʊt/', N'noun', N'Thủ tục trả phòng', N'Please check-out before 11 AM.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Concierge')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Concierge', N'/ˌkɒn.siˈeəʒ/', N'/ˌkɒn.siˈeəʒ/', N'noun', N'Nhân viên hỗ trợ khách hàng', N'The concierge can help arrange transportation or tours.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Reception')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Reception', N'/rɪˈsep.ʃən/', N'/rɪˈsep.ʃən/', N'noun', N'Quầy lễ tân', N'Please collect your room key at the reception.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Room service')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Room service', N'/ˈruːm ˌsɜː.vɪs/', N'/ˈruːm ˌsɜː.vɪs/', N'noun', N'Dịch vụ phòng', N'We ordered dinner through room service.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Suite')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Suite', N'/swiːt/', N'/swiːt/', N'noun', N'Phòng hạng sang', N'The honeymoon suite has an ocean view.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Housekeeping')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Housekeeping', N'/ˈhaʊsˌkiː.pɪŋ/', N'/ˈhaʊsˌkiː.pɪŋ/', N'noun', N'Dọn phòng, dịch vụ vệ sinh', N'Housekeeping cleans the rooms daily.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Amenities')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Amenities', N'/əˈmen.ə.tiz/', N'/əˈmen.ə.tiz/', N'noun', N'Tiện nghi', N'The hotel offers excellent amenities, including a gym and pool.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Bellboy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Bellboy', N'/ˈbel.bɔɪ/', N'/ˈbel.bɔɪ/', N'noun', N'Nhân viên khuân hành lý', N'The bellboy helped us with our luggage to the room.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Guest')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Guest', N'/ɡest/', N'/ɡest/', N'noun', N'Khách hàng', N'The hotel staff greeted every guest with a warm smile.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Lobby')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Lobby', N'/ˈlɒb.i/', N'/ˈlɒb.i/', N'noun', N'Sảnh', N'We waited for our taxi in the hotel lobby.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Key card')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Key card', N'/ˈkiː ˌkɑːd/', N'/ˈkiː ˌkɑːd/', N'noun', N'Thẻ khóa', N'You’ll need your key card to access the elevator.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Double room')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Double room', N'/ˈdʌb.l ˌruːm/', N'/ˈdʌb.l ˌruːm/', N'noun', N'Phòng đôi', N'We booked a double room for our stay.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Single room')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Single room', N'/ˈsɪŋ.ɡl ˌruːm/', N'/ˈsɪŋ.ɡl ˌruːm/', N'noun', N'Phòng đơn', N'The hotel offers affordable single rooms for solo travelers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Twin room')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Twin room', N'/ˈtwɪn ˌruːm/', N'/ˈtwɪn ˌruːm/', N'noun', N'Phòng 2 giường đơn', N'We prefer a twin room for more space.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Breakfast buffet')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Breakfast buffet', N'/ˈbrek.fəst ˈbʊf.eɪ/', N'/ˈbrek.fəst ˈbʊf.eɪ/', N'noun', N'Bữa sáng tự chọn', N'The breakfast buffet includes fresh fruits and pastries.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Cancellation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Cancellation', N'/ˌkæn.səlˈeɪ.ʃən/', N'/ˌkæn.səlˈeɪ.ʃən/', N'noun', N'Sự hủy đặt phòng', N'The hotel offers free cancellation within 24 hours of booking.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Deposit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Deposit', N'/dɪˈpɒz.ɪt/', N'/dɪˈpɒz.ɪt/', N'noun', N'Tiền đặt cọc', N'A deposit is required to confirm your reservation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Late check-out')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Late check-out', N'/leɪt ˈtʃek.aʊt/', N'/leɪt ˈtʃek.aʊt/', N'noun', N'Trả phòng muộn', N'Guests can request a late check-out for an additional fee.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Complimentary')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Complimentary', N'/ˌkɒm.plɪˈmen.tər.i/', N'/ˌkɒm.plɪˈmen.tər.i/', N'noun', N'Miễn phí', N'The hotel provides complimentary Wi-Fi for all guests.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Valet parking')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Valet parking', N'/ˌvæl.eɪ ˈpɑː.kɪŋ/', N'/ˌvæl.eɪ ˈpɑː.kɪŋ/', N'noun', N'Dịch vụ đỗ xe', N'The hotel offers valet parking for convenience.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_7 AND Word = N'Overbooking')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_7, N'Overbooking', N'/ˌəʊ.vəˈbʊk.ɪŋ/', N'/ˌəʊ.vəˈbʊk.ɪŋ/', N'noun', N'Đặt phòng vượt số lượng', N'Due to overbooking, some guests were relocated to another hotel.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_7 AND Prompt = N'Từ "Reception" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_7, N'Từ "Reception" có nghĩa là gì?', NULL, N'["Quầy lễ tân", "Thủ tục nhận phòng", "Phòng hạng sang", "Phòng đôi"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_7 AND Prompt = N'Từ "Reservation" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_7, N'Từ "Reservation" có nghĩa là gì?', NULL, N'["Đặt phòng", "Dọn phòng, dịch vụ vệ sinh", "Trả phòng muộn", "Nhân viên khuân hành lý"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_7 AND Prompt = N'Từ "Single room" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_7, N'Từ "Single room" có nghĩa là gì?', NULL, N'["Phòng đơn", "Bữa sáng tự chọn", "Phòng đôi", "Khách hàng"]', 0);

-- Chủ đề 8: Nhà hàng (Restaurant) (25 từ)
DECLARE @LessonId_8 INT;
SELECT @LessonId_8 = Id FROM dbo.Lessons WHERE Title = N'Nhà hàng (Restaurant)' AND LanguageCode = 'en';
IF @LessonId_8 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Nhà hàng (Restaurant)', 'en', 'TOEIC 450', 10, 1, 2);
    SET @LessonId_8 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Menu')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Menu', N'/ˈmen.juː/', N'/ˈmen.juː/', N'noun', N'Thực đơn', N'Can I see the menu, please?', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Reservation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Reservation', N'/ˌrez.əˈveɪ.ʃən/', N'/ˌrez.əˈveɪ.ʃən/', N'noun', N'Đặt chỗ', N'I made a reservation for two at 7 PM.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Waiter')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Waiter', N'/ˈweɪ.tər/', N'/ˈweɪ.tər/', N'noun', N'Nhân viên phục vụ nam', N'The waiter brought us the dessert menu.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Waitress')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Waitress', N'/ˈweɪ.trəs/', N'/ˈweɪ.trəs/', N'noun', N'Nhân viên phục vụ nữ', N'The waitress was very attentive and polite.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Bill')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Bill', N'/bɪl/', N'/bɪl/', N'noun', N'Hóa đơn', N'Could we have the bill, please?', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Tip')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Tip', N'/tɪp/', N'/tɪp/', N'noun', N'Tiền boa', N'Don’t forget to leave a tip for the server.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Tablecloth')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Tablecloth', N'/ˈteɪ.bəl.klɒθ/', N'/ˈteɪ.bəl.klɒθ/', N'noun', N'Khăn trải bàn', N'The tablecloth was clean and neatly arranged.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Utensils')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Utensils', N'/juːˈten.sɪlz/', N'/juːˈten.sɪlz/', N'noun', N'Dụng cụ ăn uống', N'The utensils include a fork, knife, and spoon.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Napkin')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Napkin', N'/ˈnæp.kɪn/', N'/ˈnæp.kɪn/', N'noun', N'Khăn ăn', N'He placed the napkin on his lap before eating.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Beverage')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Beverage', N'/ˈbev.ər.ɪdʒ/', N'/ˈbev.ər.ɪdʒ/', N'noun', N'Đồ uống', N'Would you like any beverage with your meal?', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Appetizer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Appetizer', N'/ˈæp.ə.taɪ.zər/', N'/ˈæp.ə.taɪ.zər/', N'noun', N'Món khai vị', N'We ordered spring rolls as an appetizer.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Main course')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Main course', N'/ˌmeɪn ˈkɔːs/', N'/ˌmeɪn ˈkɔːs/', N'noun', N'Món chính', N'The steak is a popular choice for the main course.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Dessert')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Dessert', N'/dɪˈzɜːt/', N'/dɪˈzɜːt/', N'noun', N'Món tráng miệng', N'We had chocolate cake for dessert.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Chef')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Chef', N'/ʃef/', N'/ʃef/', N'noun', N'Đầu bếp', N'The chef prepared an excellent seafood dish.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Cuisine')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Cuisine', N'/kwɪˈziːn/', N'/kwɪˈziːn/', N'noun', N'Ẩm thực', N'This restaurant specializes in Italian cuisine.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Buffet')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Buffet', N'/ˈbʊf.eɪ/', N'/ˈbʊf.eɪ/', N'noun', N'Tiệc tự chọn', N'The hotel offers a breakfast buffet every morning.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Takeaway')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Takeaway', N'/ˈteɪk.ə.weɪ/', N'/ˈteɪk.ə.weɪ/', N'noun', N'Đồ ăn mang đi', N'Can I order this meal for takeaway?', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Allergy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Allergy', N'/ˈæl.ə.dʒi/', N'/ˈæl.ə.dʒi/', N'noun', N'Dị ứng', N'Please inform the staff if you have any food allergies.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Vegan')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Vegan', N'/ˈviː.ɡən/', N'/ˈviː.ɡən/', N'noun', N'Thuần chay', N'The restaurant has a variety of vegan options.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Gluten-free')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Gluten-free', N'/ˌɡluː.tənˈfriː/', N'/ˌɡluː.tənˈfriː/', N'noun', N'Không chứa gluten', N'Do you have any gluten-free dishes?', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Special')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Special', N'/ˈspeʃ.əl/', N'/ˈspeʃ.əl/', N'adjective', N'Món đặc biệt', N'The chef’s special today is grilled salmon.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Reservation list')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Reservation list', N'/ˌrez.əˈveɪ.ʃən lɪst/', N'/ˌrez.əˈveɪ.ʃən lɪst/', N'noun', N'Danh sách đặt chỗ', N'Your name has been added to the reservation list.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Hostess')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Hostess', N'/ˈhəʊ.stes/', N'/ˈhəʊ.stes/', N'noun', N'Nhân viên lễ tân (nữ)', N'The hostess greeted us and showed us to our table.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Ambiance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Ambiance', N'/ˈæm.bi.əns/', N'/ˈæm.bi.əns/', N'noun', N'Không gian, bầu không khí', N'The restaurant has a cozy ambiance perfect for a romantic dinner.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_8 AND Word = N'Service charge')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_8, N'Service charge', N'/ˈsɜː.vɪs ˌtʃɑːdʒ/', N'/ˈsɜː.vɪs ˌtʃɑːdʒ/', N'noun', N'Phí dịch vụ', N'A 10% service charge is included in the bill.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_8 AND Prompt = N'Từ "Menu" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_8, N'Từ "Menu" có nghĩa là gì?', NULL, N'["Thuần chay", "Thực đơn", "Tiền boa", "Dụng cụ ăn uống"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_8 AND Prompt = N'Từ "Service charge" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_8, N'Từ "Service charge" có nghĩa là gì?', NULL, N'["Phí dịch vụ", "Ẩm thực", "Không gian, bầu không khí", "Thực đơn"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_8 AND Prompt = N'Từ "Ambiance" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_8, N'Từ "Ambiance" có nghĩa là gì?', NULL, N'["Không gian, bầu không khí", "Nhân viên phục vụ nam", "Đầu bếp", "Tiệc tự chọn"]', 0);

-- Chủ đề 9: Giao thông (Transportation) (25 từ)
DECLARE @LessonId_9 INT;
SELECT @LessonId_9 = Id FROM dbo.Lessons WHERE Title = N'Giao thông (Transportation)' AND LanguageCode = 'en';
IF @LessonId_9 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Giao thông (Transportation)', 'en', 'TOEIC 450', 11, 1, 2);
    SET @LessonId_9 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Transportation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Transportation', N'/ˌtræn.spɔːˈteɪ.ʃən/', N'/ˌtræn.spɔːˈteɪ.ʃən/', N'noun', N'Vận chuyển, giao thông', N'Public transportation is widely used in urban areas.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Vehicle')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Vehicle', N'/ˈviː.ɪ.kəl/', N'/ˈviː.ɪ.kəl/', N'noun', N'Phương tiện', N'There are too many vehicles on the road during rush hours.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Traffic')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Traffic', N'/ˈtræf.ɪk/', N'/ˈtræf.ɪk/', N'adjective', N'Giao thông', N'The traffic was heavy this morning.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Traffic jam')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Traffic jam', N'/ˈtræf.ɪk ˌdʒæm/', N'/ˈtræf.ɪk ˌdʒæm/', N'noun', N'Tắc đường', N'We were stuck in a traffic jam for over an hour.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Highway')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Highway', N'/ˈhaɪ.weɪ/', N'/ˈhaɪ.weɪ/', N'noun', N'Đường cao tốc', N'The highway connects two major cities.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Road')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Road', N'/rəʊd/', N'/rəʊd/', N'noun', N'Đường', N'Be careful while crossing the road.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Intersection')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Intersection', N'/ˌɪn.təˈsek.ʃən/', N'/ˌɪn.təˈsek.ʃən/', N'noun', N'Ngã tư', N'There’s a gas station at the next intersection.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Roundabout')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Roundabout', N'/ˈraʊnd.ə.baʊt/', N'/ˈraʊnd.ə.baʊt/', N'noun', N'Vòng xoay', N'Take the second exit at the roundabout.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Pedestrian')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Pedestrian', N'/pəˈdes.tri.ən/', N'/pəˈdes.tri.ən/', N'noun', N'Người đi bộ', N'Pedestrians must use the crosswalk.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Crosswalk')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Crosswalk', N'/ˈkrɒs.wɔːk/', N'/ˈkrɒs.wɔːk/', N'noun', N'Vạch sang đường', N'Cars must stop for pedestrians at the crosswalk.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Speed limit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Speed limit', N'/ˈspiːd ˌlɪm.ɪt/', N'/ˈspiːd ˌlɪm.ɪt/', N'noun', N'Giới hạn tốc độ', N'The speed limit on this road is 50 km/h.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Public transport')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Public transport', N'/ˌpʌb.lɪk ˈtræn.spɔːt/', N'/ˌpʌb.lɪk ˈtræn.spɔːt/', N'noun', N'Phương tiện công cộng', N'Using public transport helps reduce air pollution.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Train station')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Train station', N'/ˈtreɪn ˌsteɪ.ʃən/', N'/ˈtreɪn ˌsteɪ.ʃən/', N'noun', N'Ga tàu', N'The train station is located downtown.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Ticket')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Ticket', N'/ˈtɪk.ɪt/', N'/ˈtɪk.ɪt/', N'noun', N'Vé', N'Please show your ticket before boarding the train.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Timetable')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Timetable', N'/ˈtaɪmˌteɪ.bəl/', N'/ˈtaɪmˌteɪ.bəl/', N'adjective', N'Lịch trình', N'Check the timetable for the next bus.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Boarding pass')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Boarding pass', N'/ˈbɔː.dɪŋ ˌpɑːs/', N'/ˈbɔː.dɪŋ ˌpɑːs/', N'noun', N'Thẻ lên tàu/máy bay', N'You need a boarding pass to get on the plane.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Flight')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Flight', N'/flaɪt/', N'/flaɪt/', N'noun', N'Chuyến bay', N'Our flight was delayed by two hours.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Taxi')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Taxi', N'/ˈtæk.si/', N'/ˈtæk.si/', N'noun', N'Taxi', N'We took a taxi from the airport to the hotel.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Subway')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Subway', N'/ˈsʌb.weɪ/', N'/ˈsʌb.weɪ/', N'noun', N'Tàu điện ngầm', N'The subway is the fastest way to travel across the city.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Ferry')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Ferry', N'/ˈfer.i/', N'/ˈfer.i/', N'noun', N'Phà', N'The ferry connects the mainland to the island.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Cargo')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Cargo', N'/ˈkɑː.ɡəʊ/', N'/ˈkɑː.ɡəʊ/', N'noun', N'Hàng hóa vận chuyển', N'The ship is carrying heavy cargo to the port.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Logistics')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Logistics', N'/ləˈdʒɪs.tɪks/', N'/ləˈdʒɪs.tɪks/', N'noun', N'Hậu cần, vận tải', N'The company specializes in logistics and supply chain management.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Toll booth')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Toll booth', N'/ˈtəʊl ˌbuːθ/', N'/ˈtəʊl ˌbuːθ/', N'noun', N'Trạm thu phí', N'We stopped at the toll booth to pay the fee.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Departure')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Departure', N'/dɪˈpɑː.tʃər/', N'/dɪˈpɑː.tʃər/', N'noun', N'Sự khởi hành', N'The departure time is scheduled for 9:30 AM.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_9 AND Word = N'Arrival')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_9, N'Arrival', N'/əˈraɪ.vəl/', N'/əˈraɪ.vəl/', N'adjective', N'Sự đến nơi', N'Please check the arrival board for your train.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_9 AND Prompt = N'Từ "Transportation" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_9, N'Từ "Transportation" có nghĩa là gì?', NULL, N'["Vận chuyển, giao thông", "Thẻ lên tàu/máy bay", "Sự khởi hành", "Vé"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_9 AND Prompt = N'Từ "Crosswalk" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_9, N'Từ "Crosswalk" có nghĩa là gì?', NULL, N'["Vận chuyển, giao thông", "Vạch sang đường", "Đường cao tốc", "Lịch trình"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_9 AND Prompt = N'Từ "Toll booth" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_9, N'Từ "Toll booth" có nghĩa là gì?', NULL, N'["Hậu cần, vận tải", "Phà", "Thẻ lên tàu/máy bay", "Trạm thu phí"]', 3);

-- Chủ đề 10: Du lịch (Travel) (25 từ)
DECLARE @LessonId_10 INT;
SELECT @LessonId_10 = Id FROM dbo.Lessons WHERE Title = N'Du lịch (Travel)' AND LanguageCode = 'en';
IF @LessonId_10 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Du lịch (Travel)', 'en', 'TOEIC 450', 12, 1, 2);
    SET @LessonId_10 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Destination')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Destination', N'/ˌdes.tɪˈneɪ.ʃən/', N'/ˌdes.tɪˈneɪ.ʃən/', N'noun', N'Điểm đến', N'Paris is a popular tourist destination.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Itinerary')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Itinerary', N'/aɪˈtɪn.ər.ər.i/', N'/aɪˈtɪn.ər.ər.i/', N'noun', N'Lịch trình', N'The travel agency prepared an itinerary for our trip.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Passport')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Passport', N'/ˈpɑːs.pɔːt/', N'/ˈpɑːs.pɔːt/', N'noun', N'Hộ chiếu', N'Don’t forget to bring your passport to the airport.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Visa')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Visa', N'/ˈviː.zə/', N'/ˈviː.zə/', N'noun', N'Thị thực', N'She applied for a tourist visa to visit Japan.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Boarding pass')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Boarding pass', N'/ˈbɔː.dɪŋ ˌpɑːs/', N'/ˈbɔː.dɪŋ ˌpɑːs/', N'noun', N'Thẻ lên máy bay', N'You need to show your boarding pass at the gate.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Luggage')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Luggage', N'/ˈlʌɡ.ɪdʒ/', N'/ˈlʌɡ.ɪdʒ/', N'noun', N'Hành lý', N'The airline allows one piece of carry-on luggage.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Suitcase')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Suitcase', N'/ˈsuːt.keɪs/', N'/ˈsuːt.keɪs/', N'noun', N'Va li', N'He packed his clothes into a large suitcase.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Accommodation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Accommodation', N'/əˌkɒm.əˈdeɪ.ʃən/', N'/əˌkɒm.əˈdeɪ.ʃən/', N'noun', N'Chỗ ở', N'We booked our accommodation through a travel website.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Flight')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Flight', N'/flaɪt/', N'/flaɪt/', N'noun', N'Chuyến bay', N'Our flight was delayed due to bad weather.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Travel agency')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Travel agency', N'/ˈtræv.əl ˌeɪ.dʒən.si/', N'/ˈtræv.əl ˌeɪ.dʒən.si/', N'noun', N'Công ty du lịch', N'We booked the package tour through a travel agency.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Tourist')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Tourist', N'/ˈtʊə.rɪst/', N'/ˈtʊə.rɪst/', N'noun', N'Du khách', N'Many tourists visit the Eiffel Tower every year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Tour guide')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Tour guide', N'/ˈtʊə ˌɡaɪd/', N'/ˈtʊə ˌɡaɪd/', N'noun', N'Hướng dẫn viên du lịch', N'The tour guide explained the history of the monument.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Souvenir')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Souvenir', N'/ˌsuː.vənˈɪər/', N'/ˌsuː.vənˈɪər/', N'noun', N'Quà lưu niệm', N'I bought a small souvenir to remember my trip to Rome.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Sightseeing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Sightseeing', N'/ˈsaɪtˌsiː.ɪŋ/', N'/ˈsaɪtˌsiː.ɪŋ/', N'noun', N'Tham quan ngắm cảnh', N'We spent the afternoon sightseeing around the city.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Departure')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Departure', N'/dɪˈpɑː.tʃər/', N'/dɪˈpɑː.tʃər/', N'noun', N'Sự khởi hành', N'The departure time for our flight is 10:00 AM.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Arrival')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Arrival', N'/əˈraɪ.vəl/', N'/əˈraɪ.vəl/', N'adjective', N'Sự đến nơi', N'Please check the arrival board for your train information.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Excursion')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Excursion', N'/ɪkˈskɜː.ʃən/', N'/ɪkˈskɜː.ʃən/', N'noun', N'Chuyến tham quan', N'The group went on a one-day excursion to the countryside.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Resort')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Resort', N'/rɪˈzɔːt/', N'/rɪˈzɔːt/', N'noun', N'Khu nghỉ dưỡng', N'We stayed at a luxury beach resort during our vacation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Backpack')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Backpack', N'/ˈbæk.pæk/', N'/ˈbæk.pæk/', N'noun', N'Ba lô', N'She carried all her essentials in a backpack.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Customs')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Customs', N'/ˈkʌs.təmz/', N'/ˈkʌs.təmz/', N'noun', N'Hải quan', N'You need to declare any goods at customs upon arrival.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Check-in')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Check-in', N'/ˈtʃek.ɪn/', N'/ˈtʃek.ɪn/', N'noun', N'Làm thủ tục nhận phòng/máy bay', N'Please arrive two hours early to check in for your flight.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Check-out')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Check-out', N'/ˈtʃek.aʊt/', N'/ˈtʃek.aʊt/', N'noun', N'Trả phòng', N'Don’t forget to check out of the hotel by noon.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Cruise')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Cruise', N'/kruːz/', N'/kruːz/', N'verb', N'Du thuyền', N'They went on a luxury cruise around the Caribbean.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Ticket')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Ticket', N'/ˈtɪk.ɪt/', N'/ˈtɪk.ɪt/', N'noun', N'Vé', N'I booked a round-trip ticket to New York.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_10 AND Word = N'Vacation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_10, N'Vacation', N'/veɪˈkeɪ.ʃən/', N'/veɪˈkeɪ.ʃən/', N'noun', N'Kỳ nghỉ', N'We’re planning a family vacation to the mountains.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_10 AND Prompt = N'Từ "Destination" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_10, N'Từ "Destination" có nghĩa là gì?', NULL, N'["Tham quan ngắm cảnh", "Công ty du lịch", "Thẻ lên máy bay", "Điểm đến"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_10 AND Prompt = N'Từ "Check-out" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_10, N'Từ "Check-out" có nghĩa là gì?', NULL, N'["Trả phòng", "Điểm đến", "Làm thủ tục nhận phòng/máy bay", "Sự đến nơi"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_10 AND Prompt = N'Từ "Tour guide" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_10, N'Từ "Tour guide" có nghĩa là gì?', NULL, N'["Thị thực", "Hướng dẫn viên du lịch", "Sự khởi hành", "Chuyến bay"]', 1);

-- Chủ đề 11: Mua sắm (Shopping) (25 từ)
DECLARE @LessonId_11 INT;
SELECT @LessonId_11 = Id FROM dbo.Lessons WHERE Title = N'Mua sắm (Shopping)' AND LanguageCode = 'en';
IF @LessonId_11 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Mua sắm (Shopping)', 'en', 'TOEIC 450', 13, 1, 2);
    SET @LessonId_11 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Shopping mall')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Shopping mall', N'/ˈʃɒp.ɪŋ ˌmɔːl/', N'/ˈʃɒp.ɪŋ ˌmɔːl/', N'noun', N'Trung tâm thương mại', N'There is a new shopping mall near my house.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Store')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Store', N'/stɔːr/', N'/stɔːr/', N'noun', N'Cửa hàng', N'She went to the store to buy groceries.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Customer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Customer', N'/ˈkʌs.tə.mər/', N'/ˈkʌs.tə.mər/', N'noun', N'Khách hàng', N'The customer asked for a discount on the shoes.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Price')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Price', N'/praɪs/', N'/praɪs/', N'noun', N'Giá', N'The price of this dress is very reasonable.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Discount')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Discount', N'/ˈdɪs.kaʊnt/', N'/ˈdɪs.kaʊnt/', N'noun', N'Giảm giá', N'There’s a 20% discount on all items today.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Sale')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Sale', N'/seɪl/', N'/seɪl/', N'noun', N'Bán hàng giảm giá', N'The store is having a clearance sale this weekend.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Cashier')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Cashier', N'/kæˈʃɪər/', N'/kæˈʃɪər/', N'noun', N'Nhân viên thu ngân', N'The cashier helped me pay for my purchases.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Receipt')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Receipt', N'/rɪˈsiːt/', N'/rɪˈsiːt/', N'noun', N'Hóa đơn', N'Don’t forget to keep your receipt in case you need to return the item.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Refund')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Refund', N'/ˈriː.fʌnd/', N'/ˈriː.fʌnd/', N'noun', N'Hoàn tiền', N'The store offered a full refund for the defective product.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Exchange')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Exchange', N'/ɪksˈtʃeɪndʒ/', N'/ɪksˈtʃeɪndʒ/', N'noun', N'Đổi hàng', N'Can I exchange this for a different size?', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Cart')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Cart', N'/kɑːrt/', N'/kɑːrt/', N'noun', N'Giỏ hàng', N'She filled her cart with items on sale.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Bargain')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Bargain', N'/ˈbɑː.ɡɪn/', N'/ˈbɑː.ɡɪn/', N'noun', N'Món hời, mặc cả', N'I got this watch at a great bargain.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Product')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Product', N'/ˈprɒd.ʌkt/', N'/ˈprɒd.ʌkt/', N'noun', N'Sản phẩm', N'This store sells high-quality products.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Brand')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Brand', N'/brænd/', N'/brænd/', N'noun', N'Thương hiệu', N'This is a well-known brand for electronics.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Quality')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Quality', N'/ˈkwɒl.ɪ.ti/', N'/ˈkwɒl.ɪ.ti/', N'noun', N'Chất lượng', N'The quality of this handbag is excellent.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Shelf')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Shelf', N'/ʃelf/', N'/ʃelf/', N'noun', N'Kệ hàng', N'The items on the top shelf are on sale.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Shopping list')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Shopping list', N'/ˈʃɒp.ɪŋ ˌlɪst/', N'/ˈʃɒp.ɪŋ ˌlɪst/', N'noun', N'Danh sách mua sắm', N'I always bring a shopping list to avoid buying unnecessary things.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Fitting room')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Fitting room', N'/ˈfɪt.ɪŋ ˌruːm/', N'/ˈfɪt.ɪŋ ˌruːm/', N'noun', N'Phòng thử đồ', N'The fitting room is at the back of the store.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Payment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Payment', N'/ˈpeɪ.mənt/', N'/ˈpeɪ.mənt/', N'noun', N'Thanh toán', N'You can make a payment with cash or credit card.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Credit card')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Credit card', N'/ˈkred.ɪt ˌkɑːd/', N'/ˈkred.ɪt ˌkɑːd/', N'noun', N'Thẻ tín dụng', N'She used her credit card to pay for the purchase.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Debit card')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Debit card', N'/ˈdeb.ɪt ˌkɑːd/', N'/ˈdeb.ɪt ˌkɑːd/', N'noun', N'Thẻ ghi nợ', N'I prefer using my debit card for shopping.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'E-commerce')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'E-commerce', N'/ˌiːˈkɒm.ɜːs/', N'/ˌiːˈkɒm.ɜːs/', N'noun', N'Thương mại điện tử', N'Online e-commerce platforms have made shopping more convenient.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Delivery')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Delivery', N'/dɪˈlɪv.ər.i/', N'/dɪˈlɪv.ər.i/', N'noun', N'Giao hàng', N'The store offers free delivery for orders over $50.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Warranty')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Warranty', N'/ˈwɒr.ən.ti/', N'/ˈwɒr.ən.ti/', N'noun', N'Bảo hành', N'This laptop comes with a two-year warranty.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_11 AND Word = N'Promotion')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_11, N'Promotion', N'/prəˈməʊ.ʃən/', N'/prəˈməʊ.ʃən/', N'noun', N'Khuyến mãi', N'The store is running a special promotion for the holiday season.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_11 AND Prompt = N'Từ "Payment" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_11, N'Từ "Payment" có nghĩa là gì?', NULL, N'["Sản phẩm", "Khuyến mãi", "Bán hàng giảm giá", "Thanh toán"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_11 AND Prompt = N'Từ "E-commerce" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_11, N'Từ "E-commerce" có nghĩa là gì?', NULL, N'["Hoàn tiền", "Giao hàng", "Thương mại điện tử", "Thanh toán"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_11 AND Prompt = N'Từ "Customer" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_11, N'Từ "Customer" có nghĩa là gì?', NULL, N'["Khách hàng", "Cửa hàng", "Hóa đơn", "Khuyến mãi"]', 0);

-- Chủ đề 12: Dịch vụ khách hàng (Customer Service) (24 từ)
DECLARE @LessonId_12 INT;
SELECT @LessonId_12 = Id FROM dbo.Lessons WHERE Title = N'Dịch vụ khách hàng (Customer Service)' AND LanguageCode = 'en';
IF @LessonId_12 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Dịch vụ khách hàng (Customer Service)', 'en', 'TOEIC 450', 14, 1, 2);
    SET @LessonId_12 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Customer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Customer', N'/ˈkʌs.tə.mər/', N'/ˈkʌs.tə.mər/', N'noun', N'Khách hàng', N'The customer requested a refund for the faulty product.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Service')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Service', N'/ˈsɜː.vɪs/', N'/ˈsɜː.vɪs/', N'noun', N'Dịch vụ', N'The store provides excellent service to its clients.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Feedback')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Feedback', N'/ˈfiːd.bæk/', N'/ˈfiːd.bæk/', N'noun', N'Phản hồi', N'Customer feedback helps improve our services.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Inquiry')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Inquiry', N'/ɪnˈkwaɪə.ri/', N'/ɪnˈkwaɪə.ri/', N'noun', N'Yêu cầu thông tin', N'We received an inquiry about the availability of the product.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Complaint')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Complaint', N'/kəmˈpleɪnt/', N'/kəmˈpleɪnt/', N'noun', N'Phàn nàn', N'The customer filed a complaint about the late delivery.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Support')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Support', N'/səˈpɔːt/', N'/səˈpɔːt/', N'noun', N'Hỗ trợ', N'The technical support team resolved the issue quickly.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Representative')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Representative', N'/ˌrep.rɪˈzen.tə.tɪv/', N'/ˌrep.rɪˈzen.tə.tɪv/', N'adjective', N'Đại diện', N'A customer service representative will assist you shortly.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Resolution')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Resolution', N'/ˌrez.əˈluː.ʃən/', N'/ˌrez.əˈluː.ʃən/', N'noun', N'Giải quyết', N'We aim for a quick resolution to all customer issues.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Hotline')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Hotline', N'/ˈhɒt.laɪn/', N'/ˈhɒt.laɪn/', N'noun', N'Đường dây nóng', N'Please call our hotline for urgent assistance.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Satisfaction')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Satisfaction', N'/ˌsæt.ɪsˈfæk.ʃən/', N'/ˌsæt.ɪsˈfæk.ʃən/', N'noun', N'Sự hài lòng', N'Customer satisfaction is our top priority.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Return policy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Return policy', N'/rɪˈtɜːn ˌpɒl.ɪ.si/', N'/rɪˈtɜːn ˌpɒl.ɪ.si/', N'noun', N'Chính sách hoàn trả', N'The return policy allows refunds within 30 days.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Refund')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Refund', N'/ˈriː.fʌnd/', N'/ˈriː.fʌnd/', N'noun', N'Hoàn tiền', N'The customer requested a refund for the damaged product.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Exchange')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Exchange', N'/ɪksˈtʃeɪndʒ/', N'/ɪksˈtʃeɪndʒ/', N'noun', N'Đổi hàng', N'Can I exchange this item for a different size?', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Response time')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Response time', N'/rɪˈspɒns ˌtaɪm/', N'/rɪˈspɒns ˌtaɪm/', N'noun', N'Thời gian phản hồi', N'Our response time for emails is within 24 hours.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Loyalty program')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Loyalty program', N'/ˈlɔɪ.əl.ti ˌprəʊ.ɡræm/', N'/ˈlɔɪ.əl.ti ˌprəʊ.ɡræm/', N'noun', N'Chương trình khách hàng thân thiết', N'The loyalty program rewards frequent shoppers with discounts.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Follow-up')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Follow-up', N'/ˈfɒl.oʊ.ʌp/', N'/ˈfɒl.oʊ.ʌp/', N'noun', N'Theo dõi (sau dịch vụ)', N'The customer service agent made a follow-up call to ensure satisfaction.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Guarantee')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Guarantee', N'/ˌɡær.ənˈtiː/', N'/ˌɡær.ənˈtiː/', N'noun', N'Sự đảm bảo', N'The product comes with a money-back guarantee.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Courtesy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Courtesy', N'/ˈkɜː.tə.si/', N'/ˈkɜː.tə.si/', N'noun', N'Sự lịch sự', N'The staff handled the complaint with professionalism and courtesy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Queue')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Queue', N'/kjuː/', N'/kjuː/', N'noun', N'Hàng chờ', N'There is a long queue at the customer service desk.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Assistance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Assistance', N'/əˈsɪs.təns/', N'/əˈsɪs.təns/', N'noun', N'Sự trợ giúp', N'The representative provided excellent assistance.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Resolve')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Resolve', N'/rɪˈzɒlv/', N'/rɪˈzɒlv/', N'noun', N'Giải quyết', N'We will resolve your issue as soon as possible.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Escalation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Escalation', N'/ˌes.kəˈleɪ.ʃən/', N'/ˌes.kəˈleɪ.ʃən/', N'noun', N'Sự chuyển cấp (xử lý vấn đề)', N'The case was sent to the manager for escalation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Chatbot')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Chatbot', N'/ˈtʃæt.bɒt/', N'/ˈtʃæt.bɒt/', N'noun', N'Trợ lý ảo (chatbot)', N'The company uses a chatbot to handle basic customer inquiries.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_12 AND Word = N'Complaint ticket')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_12, N'Complaint ticket', N'/kəmˈpleɪnt ˌtɪk.ɪt/', N'/kəmˈpleɪnt ˌtɪk.ɪt/', N'noun', N'Phiếu ghi nhận khiếu nại', N'Your complaint ticket number is 12345.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_12 AND Prompt = N'Từ "Loyalty program" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_12, N'Từ "Loyalty program" có nghĩa là gì?', NULL, N'["Đại diện", "Dịch vụ", "Chương trình khách hàng thân thiết", "Khách hàng"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_12 AND Prompt = N'Từ "Queue" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_12, N'Từ "Queue" có nghĩa là gì?', NULL, N'["Giải quyết", "Phiếu ghi nhận khiếu nại", "Hàng chờ", "Sự đảm bảo"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_12 AND Prompt = N'Từ "Refund" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_12, N'Từ "Refund" có nghĩa là gì?', NULL, N'["Dịch vụ", "Hoàn tiền", "Trợ lý ảo (chatbot)", "Giải quyết"]', 1);

-- Chủ đề 13: Công nghệ (Technology) (21 từ)
DECLARE @LessonId_13 INT;
SELECT @LessonId_13 = Id FROM dbo.Lessons WHERE Title = N'Công nghệ (Technology)' AND LanguageCode = 'en';
IF @LessonId_13 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Công nghệ (Technology)', 'en', 'TOEIC 450', 15, 1, 2);
    SET @LessonId_13 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Technology')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Technology', N'/tekˈnɒl.ə.dʒi/', N'/tekˈnɒl.ə.dʒi/', N'noun', N'Công nghệ', N'Advances in technology have changed the way we communicate.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Innovation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Innovation', N'/ˌɪn.əˈveɪ.ʃən/', N'/ˌɪn.əˈveɪ.ʃən/', N'noun', N'Sự đổi mới', N'This company is known for its groundbreaking innovation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Software')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Software', N'/ˈsɒft.weər/', N'/ˈsɒft.weər/', N'noun', N'Phần mềm', N'The IT team installed the latest software on all company computers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Hardware')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Hardware', N'/ˈhɑːd.weər/', N'/ˈhɑːd.weər/', N'noun', N'Phần cứng', N'The store sells computer hardware such as keyboards and monitors.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Device')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Device', N'/dɪˈvaɪs/', N'/dɪˈvaɪs/', N'noun', N'Thiết bị', N'Smartphones are versatile devices used in everyday life.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Database')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Database', N'/ˈdeɪ.tə.beɪs/', N'/ˈdeɪ.tə.beɪs/', N'noun', N'Cơ sở dữ liệu', N'The company stores customer information in a secure database.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Network')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Network', N'/ˈnet.wɜːk/', N'/ˈnet.wɜːk/', N'noun', N'Mạng lưới', N'The office network is down, so we cannot access the internet.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Cloud computing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Cloud computing', N'/klaʊd kəmˈpjuː.tɪŋ/', N'/klaʊd kəmˈpjuː.tɪŋ/', N'noun', N'Điện toán đám mây', N'Cloud computing allows users to store data online.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Algorithm')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Algorithm', N'/ˈæl.ɡə.rɪ.ðəm/', N'/ˈæl.ɡə.rɪ.ðəm/', N'noun', N'Thuật toán', N'Social media platforms use complex algorithms to suggest content.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Cybersecurity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Cybersecurity', N'/ˌsaɪ.bə.sɪˈkjʊə.rə.ti/', N'/ˌsaɪ.bə.sɪˈkjʊə.rə.ti/', N'noun', N'An ninh mạng', N'Cybersecurity is essential to protect sensitive data.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Firewall')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Firewall', N'/ˈfaɪə.wɔːl/', N'/ˈfaɪə.wɔːl/', N'noun', N'Tường lửa', N'The IT department installed a firewall to block unauthorized access.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Bandwidth')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Bandwidth', N'/ˈbænd.wɪdθ/', N'/ˈbænd.wɪdθ/', N'noun', N'Băng thông', N'Video streaming requires a high bandwidth connection.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Operating system')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Operating system', N'/ˈɒp.ər.eɪ.tɪŋ ˌsɪs.təm/', N'/ˈɒp.ər.eɪ.tɪŋ ˌsɪs.təm/', N'noun', N'Hệ điều hành', N'Windows is one of the most popular operating systems.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Password')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Password', N'/ˈpɑːs.wɜːd/', N'/ˈpɑːs.wɜːd/', N'noun', N'Mật khẩu', N'Always choose a strong password to secure your account.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Encryption')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Encryption', N'/ɪnˈkrɪp.ʃən/', N'/ɪnˈkrɪp.ʃən/', N'noun', N'Mã hóa', N'All sensitive information is protected by encryption.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Bluetooth')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Bluetooth', N'/ˈbluː.tuːθ/', N'/ˈbluː.tuːθ/', N'noun', N'Bluetooth', N'Connect your headphones via Bluetooth for wireless listening.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Processor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Processor', N'/ˈprəʊ.ses.ər/', N'/ˈprəʊ.ses.ər/', N'noun', N'Bộ xử lý', N'This laptop has a fast processor for gaming.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Keyboard')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Keyboard', N'/ˈkiː.bɔːd/', N'/ˈkiː.bɔːd/', N'noun', N'Bàn phím', N'The keyboard on my computer needs to be replaced.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Monitor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Monitor', N'/ˈmɒn.ɪ.tər/', N'/ˈmɒn.ɪ.tər/', N'noun', N'Màn hình', N'He connected the computer to a larger monitor.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'Smart device')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'Smart device', N'/smɑːt dɪˈvaɪs/', N'/smɑːt dɪˈvaɪs/', N'noun', N'Thiết bị thông minh', N'Many homes now use smart devices like Alexa or Google Home.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_13 AND Word = N'QR code')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_13, N'QR code', N'/ˌkjuːˈɑːr ˌkəʊd/', N'/ˌkjuːˈɑːr ˌkəʊd/', N'noun', N'Mã QR', N'Scan the QR code to access the website.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_13 AND Prompt = N'Từ "Technology" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_13, N'Từ "Technology" có nghĩa là gì?', NULL, N'["Mật khẩu", "Công nghệ", "Phần mềm", "Hệ điều hành"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_13 AND Prompt = N'Từ "Algorithm" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_13, N'Từ "Algorithm" có nghĩa là gì?', NULL, N'["Thuật toán", "Băng thông", "Mạng lưới", "Thiết bị"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_13 AND Prompt = N'Từ "Operating system" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_13, N'Từ "Operating system" có nghĩa là gì?', NULL, N'["Điện toán đám mây", "Sự đổi mới", "Hệ điều hành", "Mã QR"]', 2);

-- Chủ đề 14: Y tế (Healthcare) (24 từ)
DECLARE @LessonId_14 INT;
SELECT @LessonId_14 = Id FROM dbo.Lessons WHERE Title = N'Y tế (Healthcare)' AND LanguageCode = 'en';
IF @LessonId_14 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Y tế (Healthcare)', 'en', 'TOEIC 450', 16, 1, 2);
    SET @LessonId_14 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Healthcare')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Healthcare', N'/ˈhelθ.keər/', N'/ˈhelθ.keər/', N'noun', N'Chăm sóc sức khỏe', N'Access to affordable healthcare is essential for everyone.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Doctor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Doctor', N'/ˈdɒk.tər/', N'/ˈdɒk.tər/', N'noun', N'Bác sĩ', N'The doctor prescribed medication for her illness.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Nurse')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Nurse', N'/nɜːs/', N'/nɜːs/', N'noun', N'Y tá', N'The nurse took my blood pressure during the check-up.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Patient')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Patient', N'/ˈpeɪ.ʃənt/', N'/ˈpeɪ.ʃənt/', N'noun', N'Bệnh nhân', N'The patient is recovering well after surgery.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Prescription')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Prescription', N'/prɪˈskrɪp.ʃən/', N'/prɪˈskrɪp.ʃən/', N'noun', N'Đơn thuốc', N'The pharmacist filled my prescription quickly.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Medication')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Medication', N'/ˌmed.ɪˈkeɪ.ʃən/', N'/ˌmed.ɪˈkeɪ.ʃən/', N'noun', N'Thuốc', N'The medication should be taken twice daily.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Treatment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Treatment', N'/ˈtriːt.mənt/', N'/ˈtriːt.mənt/', N'noun', N'Sự điều trị', N'He is undergoing treatment for a serious condition.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Diagnosis')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Diagnosis', N'/ˌdaɪ.əɡˈnəʊ.sɪs/', N'/ˌdaɪ.əɡˈnəʊ.sɪs/', N'noun', N'Chẩn đoán', N'The diagnosis confirmed the patient had pneumonia.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Surgery')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Surgery', N'/ˈsɜː.dʒər.i/', N'/ˈsɜː.dʒər.i/', N'noun', N'Phẫu thuật', N'The patient underwent surgery to remove a tumor.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Emergency')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Emergency', N'/ɪˈmɜː.dʒən.si/', N'/ɪˈmɜː.dʒən.si/', N'noun', N'Cấp cứu', N'Please call 911 in case of an emergency.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Hospital')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Hospital', N'/ˈhɒs.pɪ.təl/', N'/ˈhɒs.pɪ.təl/', N'adjective', N'Bệnh viện', N'He was admitted to the hospital for further tests.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Clinic')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Clinic', N'/ˈklɪn.ɪk/', N'/ˈklɪn.ɪk/', N'adjective', N'Phòng khám', N'She visited a dental clinic for her toothache.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Health insurance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Health insurance', N'/ˈhelθ ɪnˌʃɔː.rəns/', N'/ˈhelθ ɪnˌʃɔː.rəns/', N'noun', N'Bảo hiểm y tế', N'The company provides employees with health insurance.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Vaccine')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Vaccine', N'/ˈvæk.siːn/', N'/ˈvæk.siːn/', N'noun', N'Vắc-xin', N'The flu vaccine is recommended for elderly people.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Check-up')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Check-up', N'/ˈtʃek.ʌp/', N'/ˈtʃek.ʌp/', N'noun', N'Kiểm tra sức khỏe', N'I have a regular check-up every six months.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Symptoms')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Symptoms', N'/ˈsɪmp.təmz/', N'/ˈsɪmp.təmz/', N'noun', N'Triệu chứng', N'Common symptoms of a cold include coughing and sneezing.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Blood pressure')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Blood pressure', N'/ˈblʌd ˌpreʃ.ər/', N'/ˈblʌd ˌpreʃ.ər/', N'noun', N'Huyết áp', N'My blood pressure was higher than normal during the check-up.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Pharmacy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Pharmacy', N'/ˈfɑː.mə.si/', N'/ˈfɑː.mə.si/', N'noun', N'Hiệu thuốc', N'You can purchase the medicine at the pharmacy across the street.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Specialist')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Specialist', N'/ˈspeʃ.ə.lɪst/', N'/ˈspeʃ.ə.lɪst/', N'noun', N'Bác sĩ chuyên khoa', N'She consulted a heart specialist for her condition.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Rehabilitation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Rehabilitation', N'/ˌriː.həˌbɪl.ɪˈteɪ.ʃən/', N'/ˌriː.həˌbɪl.ɪˈteɪ.ʃən/', N'noun', N'Phục hồi chức năng', N'He is undergoing rehabilitation after his accident.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Appointment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Appointment', N'/əˈpɔɪnt.mənt/', N'/əˈpɔɪnt.mənt/', N'noun', N'Cuộc hẹn', N'I have an appointment with the dermatologist at 3 PM.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Chronic')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Chronic', N'/ˈkrɒn.ɪk/', N'/ˈkrɒn.ɪk/', N'adjective', N'Mãn tính', N'Diabetes is a chronic condition that requires long-term care.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Acute')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Acute', N'/əˈkjuːt/', N'/əˈkjuːt/', N'noun', N'Cấp tính', N'She was admitted to the ER with acute chest pain.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_14 AND Word = N'Mental health')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_14, N'Mental health', N'/ˈmen.təl ˌhelθ/', N'/ˈmen.təl ˌhelθ/', N'noun', N'Sức khỏe tinh thần', N'Mental health is just as important as physical health.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_14 AND Prompt = N'Từ "Mental health" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_14, N'Từ "Mental health" có nghĩa là gì?', NULL, N'["Chăm sóc sức khỏe", "Bệnh viện", "Chẩn đoán", "Sức khỏe tinh thần"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_14 AND Prompt = N'Từ "Health insurance" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_14, N'Từ "Health insurance" có nghĩa là gì?', NULL, N'["Sức khỏe tinh thần", "Mãn tính", "Bảo hiểm y tế", "Vắc-xin"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_14 AND Prompt = N'Từ "Emergency" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_14, N'Từ "Emergency" có nghĩa là gì?', NULL, N'["Bác sĩ chuyên khoa", "Chăm sóc sức khỏe", "Vắc-xin", "Cấp cứu"]', 3);

-- Chủ đề 15: Giáo dục (Education) (26 từ)
DECLARE @LessonId_15 INT;
SELECT @LessonId_15 = Id FROM dbo.Lessons WHERE Title = N'Giáo dục (Education)' AND LanguageCode = 'en';
IF @LessonId_15 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Giáo dục (Education)', 'en', 'TOEIC 450', 17, 1, 2);
    SET @LessonId_15 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Education')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Education', N'/ˌedʒ.ʊˈkeɪ.ʃən/', N'/ˌedʒ.ʊˈkeɪ.ʃən/', N'noun', N'Giáo dục', N'Access to quality education is essential for every child.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Student')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Student', N'/ˈstjuː.dənt/', N'/ˈstjuː.dənt/', N'noun', N'Học sinh, sinh viên', N'The student submitted the assignment on time.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Teacher')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Teacher', N'/ˈtiː.tʃər/', N'/ˈtiː.tʃər/', N'noun', N'Giáo viên', N'The teacher explained the concept clearly.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Classroom')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Classroom', N'/ˈklɑːs.rʊm/', N'/ˈklɑːs.rʊm/', N'noun', N'Lớp học', N'The classroom was equipped with modern technology.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Curriculum')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Curriculum', N'/kəˈrɪk.jə.ləm/', N'/kəˈrɪk.jə.ləm/', N'noun', N'Chương trình giảng dạy', N'The new curriculum focuses on practical skills.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Assignment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Assignment', N'/əˈsaɪn.mənt/', N'/əˈsaɪn.mənt/', N'noun', N'Bài tập', N'Students are required to complete their assignments by Friday.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Lecture')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Lecture', N'/ˈlek.tʃər/', N'/ˈlek.tʃər/', N'noun', N'Bài giảng', N'The professor delivered an engaging lecture on economics.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Exam')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Exam', N'/ɪɡˈzæm/', N'/ɪɡˈzæm/', N'noun', N'Kỳ thi', N'She studied hard to pass the final exam.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Degree')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Degree', N'/dɪˈɡriː/', N'/dɪˈɡriː/', N'noun', N'Bằng cấp', N'He earned a master’s degree in computer science.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Diploma')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Diploma', N'/dɪˈpləʊ.mə/', N'/dɪˈpləʊ.mə/', N'noun', N'Chứng chỉ', N'She received her high school diploma last year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Scholarship')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Scholarship', N'/ˈskɒl.ə.ʃɪp/', N'/ˈskɒl.ə.ʃɪp/', N'noun', N'Học bổng', N'He was awarded a full scholarship to study abroad.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Tuition fee')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Tuition fee', N'/tjuːˈɪʃ.ən fiː/', N'/tjuːˈɪʃ.ən fiː/', N'noun', N'Học phí', N'Many students struggle to pay their tuition fees.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Subject')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Subject', N'/ˈsʌb.dʒɪkt/', N'/ˈsʌb.dʒɪkt/', N'noun', N'Môn học', N'Mathematics is her favorite subject.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Syllabus')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Syllabus', N'/ˈsɪl.ə.bəs/', N'/ˈsɪl.ə.bəs/', N'noun', N'Đề cương khóa học', N'The syllabus outlines all the topics for the course.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Degree program')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Degree program', N'/dɪˈɡriː ˌprəʊ.ɡræm/', N'/dɪˈɡriː ˌprəʊ.ɡræm/', N'noun', N'Chương trình cấp bằng', N'The university offers a wide range of degree programs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Homework')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Homework', N'/ˈhəʊm.wɜːk/', N'/ˈhəʊm.wɜːk/', N'noun', N'Bài tập về nhà', N'Students should complete their homework before the next class.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Quiz')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Quiz', N'/kwɪz/', N'/kwɪz/', N'noun', N'Bài kiểm tra ngắn', N'The teacher gave the students a quiz to review the lesson.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'School uniform')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'School uniform', N'/ˈskuːl ˌjuː.nɪ.fɔːm/', N'/ˈskuːl ˌjuː.nɪ.fɔːm/', N'noun', N'Đồng phục học sinh', N'All students are required to wear the school uniform.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Principal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Principal', N'/ˈprɪn.sə.pəl/', N'/ˈprɪn.sə.pəl/', N'adjective', N'Hiệu trưởng', N'The principal announced new rules for the school year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'University')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'University', N'/ˌjuː.nɪˈvɜː.sə.ti/', N'/ˌjuː.nɪˈvɜː.sə.ti/', N'noun', N'Đại học', N'She plans to study engineering at a prestigious university.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Elementary school')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Elementary school', N'/ˌel.ɪˈmen.tər.i ˌskuːl/', N'/ˌel.ɪˈmen.tər.i ˌskuːl/', N'noun', N'Trường tiểu học', N'He has been teaching at an elementary school for ten years.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'High school')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'High school', N'/ˈhaɪ ˌskuːl/', N'/ˈhaɪ ˌskuːl/', N'noun', N'Trường trung học phổ thông', N'Many students decide their future career paths in high school.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Vocational school')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Vocational school', N'/vəʊˈkeɪ.ʃən.əl ˌskuːl/', N'/vəʊˈkeɪ.ʃən.əl ˌskuːl/', N'noun', N'Trường dạy nghề', N'He attended a vocational school to learn carpentry.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Attendance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Attendance', N'/əˈten.dəns/', N'/əˈten.dəns/', N'noun', N'Sự tham dự', N'The teacher keeps track of attendance daily.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Academic')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Academic', N'/ˌæk.əˈdem.ɪk/', N'/ˌæk.əˈdem.ɪk/', N'adjective', N'Học thuật', N'Her academic achievements are impressive.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_15 AND Word = N'Literacy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_15, N'Literacy', N'/ˈlɪt.ər.ə.si/', N'/ˈlɪt.ər.ə.si/', N'noun', N'Sự biết đọc biết viết', N'Promoting literacy is a global priority.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_15 AND Prompt = N'Từ "Degree program" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_15, N'Từ "Degree program" có nghĩa là gì?', NULL, N'["Trường tiểu học", "Chương trình cấp bằng", "Học phí", "Giáo viên"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_15 AND Prompt = N'Từ "Curriculum" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_15, N'Từ "Curriculum" có nghĩa là gì?', NULL, N'["Đề cương khóa học", "Trường tiểu học", "Đại học", "Chương trình giảng dạy"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_15 AND Prompt = N'Từ "Quiz" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_15, N'Từ "Quiz" có nghĩa là gì?', NULL, N'["Môn học", "Bài kiểm tra ngắn", "Đồng phục học sinh", "Đề cương khóa học"]', 1);

-- Chủ đề 16: Logistics (Logistics) (25 từ)
DECLARE @LessonId_16 INT;
SELECT @LessonId_16 = Id FROM dbo.Lessons WHERE Title = N'Logistics (Logistics)' AND LanguageCode = 'en';
IF @LessonId_16 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Logistics (Logistics)', 'en', 'TOEIC 650', 18, 2, 3);
    SET @LessonId_16 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Logistics')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Logistics', N'/ləˈdʒɪs.tɪks/', N'/ləˈdʒɪs.tɪks/', N'noun', N'Hậu cần, vận tải', N'Logistics is essential for efficient supply chain management.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Supply chain')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Supply chain', N'/səˈplaɪ ˌtʃeɪn/', N'/səˈplaɪ ˌtʃeɪn/', N'noun', N'Chuỗi cung ứng', N'The company optimized its supply chain to reduce costs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Inventory')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Inventory', N'/ˈɪn.vən.tər.i/', N'/ˈɪn.vən.tər.i/', N'noun', N'Hàng tồn kho', N'The store checks its inventory levels weekly.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Warehouse')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Warehouse', N'/ˈweə.haʊs/', N'/ˈweə.haʊs/', N'noun', N'Kho hàng', N'Goods are stored in the warehouse before being shipped.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Freight')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Freight', N'/freɪt/', N'/freɪt/', N'noun', N'Hàng hóa vận chuyển', N'The freight will arrive at the port tomorrow.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Shipment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Shipment', N'/ˈʃɪp.mənt/', N'/ˈʃɪp.mənt/', N'noun', N'Lô hàng', N'The shipment was delayed due to bad weather.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Cargo')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Cargo', N'/ˈkɑː.ɡəʊ/', N'/ˈkɑː.ɡəʊ/', N'noun', N'Hàng hóa', N'The plane was loaded with heavy cargo.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Delivery')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Delivery', N'/dɪˈlɪv.ər.i/', N'/dɪˈlɪv.ər.i/', N'noun', N'Giao hàng', N'The delivery is expected to arrive by the end of the day.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Carrier')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Carrier', N'/ˈkær.i.ər/', N'/ˈkær.i.ər/', N'noun', N'Hãng vận tải, đơn vị vận chuyển', N'The goods were transported by a well-known carrier.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Distribution')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Distribution', N'/ˌdɪs.trɪˈbjuː.ʃən/', N'/ˌdɪs.trɪˈbjuː.ʃən/', N'noun', N'Phân phối', N'The company handles the distribution of goods across the country.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Freight forwarder')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Freight forwarder', N'/freɪt ˈfɔː.wə.dər/', N'/freɪt ˈfɔː.wə.dər/', N'noun', N'Đại lý giao nhận vận tải', N'The freight forwarder arranged the shipping process.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Packing list')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Packing list', N'/ˈpæk.ɪŋ ˌlɪst/', N'/ˈpæk.ɪŋ ˌlɪst/', N'noun', N'Danh sách đóng gói', N'The packing list includes details of all items in the shipment.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Customs clearance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Customs clearance', N'/ˈkʌs.təmz ˈklɪə.rəns/', N'/ˈkʌs.təmz ˈklɪə.rəns/', N'noun', N'Thông quan', N'Customs clearance is required for all imported goods.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Tracking number')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Tracking number', N'/ˈtræk.ɪŋ ˌnʌm.bər/', N'/ˈtræk.ɪŋ ˌnʌm.bər/', N'noun', N'Mã theo dõi', N'You can use the tracking number to check the status of your package.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Lead time')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Lead time', N'/ˈliːd ˌtaɪm/', N'/ˈliːd ˌtaɪm/', N'noun', N'Thời gian thực hiện', N'The lead time for delivery is approximately five days.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Bill of lading')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Bill of lading', N'/ˌbɪl əv ˈleɪ.dɪŋ/', N'/ˌbɪl əv ˈleɪ.dɪŋ/', N'noun', N'Vận đơn', N'The bill of lading serves as a receipt for shipped goods.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Loading dock')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Loading dock', N'/ˈləʊ.dɪŋ ˌdɒk/', N'/ˈləʊ.dɪŋ ˌdɒk/', N'noun', N'Bến bốc dỡ hàng', N'Trucks are parked at the loading dock to load goods.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Dispatch')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Dispatch', N'/dɪˈspætʃ/', N'/dɪˈspætʃ/', N'noun', N'Gửi đi', N'The goods were dispatched from the warehouse yesterday.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Consolidation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Consolidation', N'/kənˌsɒl.ɪˈdeɪ.ʃən/', N'/kənˌsɒl.ɪˈdeɪ.ʃən/', N'noun', N'Gom hàng', N'Consolidation reduces shipping costs by combining multiple shipments.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Dock')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Dock', N'/dɒk/', N'/dɒk/', N'noun', N'Bến cảng', N'The cargo ship arrived at the dock early this morning.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Import')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Import', N'/ˈɪm.pɔːt/', N'/ˈɪm.pɔːt/', N'noun', N'Nhập khẩu', N'The company specializes in importing high-quality products.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Export')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Export', N'/ˈek.spɔːt/', N'/ˈek.spɔːt/', N'noun', N'Xuất khẩu', N'Vietnam’s largest export is coffee.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Order fulfillment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Order fulfillment', N'/ˈɔː.dər fʊlˈfɪl.mənt/', N'/ˈɔː.dər fʊlˈfɪl.mənt/', N'noun', N'Hoàn thành đơn hàng', N'Efficient order fulfillment ensures customer satisfaction.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Return logistics')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Return logistics', N'/rɪˈtɜːn ləˈdʒɪs.tɪks/', N'/rɪˈtɜːn ləˈdʒɪs.tɪks/', N'noun', N'Logistics hoàn trả', N'Return logistics handle the reverse flow of goods from customers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_16 AND Word = N'Supply chain management')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_16, N'Supply chain management', N'/səˈplaɪ tʃeɪn ˈmæn.ɪdʒ.mənt/', N'/səˈplaɪ tʃeɪn ˈmæn.ɪdʒ.mənt/', N'noun', N'Quản lý chuỗi cung ứng', N'Effective supply chain management helps reduce operational costs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_16 AND Prompt = N'Từ "Logistics" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_16, N'Từ "Logistics" có nghĩa là gì?', NULL, N'["Xuất khẩu", "Gom hàng", "Hậu cần, vận tải", "Hàng hóa"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_16 AND Prompt = N'Từ "Warehouse" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_16, N'Từ "Warehouse" có nghĩa là gì?', NULL, N'["Kho hàng", "Chuỗi cung ứng", "Phân phối", "Hậu cần, vận tải"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_16 AND Prompt = N'Từ "Cargo" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_16, N'Từ "Cargo" có nghĩa là gì?', NULL, N'["Hàng hóa", "Hoàn thành đơn hàng", "Danh sách đóng gói", "Hậu cần, vận tải"]', 0);

-- Chủ đề 17: Giao nhận hàng hóa (Shipping) (25 từ)
DECLARE @LessonId_17 INT;
SELECT @LessonId_17 = Id FROM dbo.Lessons WHERE Title = N'Giao nhận hàng hóa (Shipping)' AND LanguageCode = 'en';
IF @LessonId_17 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Giao nhận hàng hóa (Shipping)', 'en', 'TOEIC 650', 19, 2, 3);
    SET @LessonId_17 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Shipping')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Shipping', N'/ˈʃɪp.ɪŋ/', N'/ˈʃɪp.ɪŋ/', N'noun', N'Vận chuyển hàng hóa', N'The shipping cost is included in the final price.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Shipment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Shipment', N'/ˈʃɪp.mənt/', N'/ˈʃɪp.mənt/', N'noun', N'Lô hàng', N'The shipment is expected to arrive next week.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Freight')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Freight', N'/freɪt/', N'/freɪt/', N'noun', N'Hàng hóa vận chuyển', N'The company specializes in freight forwarding services.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Cargo')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Cargo', N'/ˈkɑː.ɡəʊ/', N'/ˈkɑː.ɡəʊ/', N'noun', N'Hàng hóa (trên tàu, máy bay)', N'The ship is carrying heavy cargo to the port.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Consignment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Consignment', N'/kənˈsaɪn.mənt/', N'/kənˈsaɪn.mənt/', N'noun', N'Lô hàng ký gửi', N'The consignment contains electronics and furniture.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Bill of lading')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Bill of lading', N'/ˌbɪl əv ˈleɪ.dɪŋ/', N'/ˌbɪl əv ˈleɪ.dɪŋ/', N'noun', N'Vận đơn', N'The bill of lading confirms the details of the shipment.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Packing list')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Packing list', N'/ˈpæk.ɪŋ ˌlɪst/', N'/ˈpæk.ɪŋ ˌlɪst/', N'noun', N'Danh sách đóng gói', N'The packing list includes all items in the shipment.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Delivery note')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Delivery note', N'/dɪˈlɪv.ər.i ˌnəʊt/', N'/dɪˈlɪv.ər.i ˌnəʊt/', N'noun', N'Phiếu giao hàng', N'The driver gave the customer a delivery note for the shipment.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Tracking number')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Tracking number', N'/ˈtræk.ɪŋ ˌnʌm.bər/', N'/ˈtræk.ɪŋ ˌnʌm.bər/', N'noun', N'Mã theo dõi', N'Enter the tracking number to check your package status.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Customs clearance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Customs clearance', N'/ˈkʌs.təmz ˈklɪə.rəns/', N'/ˈkʌs.təmz ˈklɪə.rəns/', N'noun', N'Thông quan', N'The goods are held at the port awaiting customs clearance.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Container')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Container', N'/kənˈteɪ.nər/', N'/kənˈteɪ.nər/', N'noun', N'Công-ten-nơ', N'The goods were packed into a 40-foot container.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Dispatch')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Dispatch', N'/dɪˈspætʃ/', N'/dɪˈspætʃ/', N'noun', N'Gửi đi', N'The items were dispatched from the warehouse yesterday.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Delivery')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Delivery', N'/dɪˈlɪv.ər.i/', N'/dɪˈlɪv.ər.i/', N'noun', N'Giao hàng', N'The delivery is scheduled for tomorrow morning.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Carrier')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Carrier', N'/ˈkær.i.ər/', N'/ˈkær.i.ər/', N'noun', N'Hãng vận tải', N'The carrier is responsible for transporting the goods safely.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Loading dock')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Loading dock', N'/ˈləʊ.dɪŋ ˌdɒk/', N'/ˈləʊ.dɪŋ ˌdɒk/', N'noun', N'Bến bốc hàng', N'Trucks are loaded at the loading dock.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Unloading')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Unloading', N'/ˌʌnˈləʊ.dɪŋ/', N'/ˌʌnˈləʊ.dɪŋ/', N'noun', N'Dỡ hàng', N'The workers are unloading the goods from the truck.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Port')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Port', N'/pɔːt/', N'/pɔːt/', N'noun', N'Cảng', N'The port is busy with ships arriving from different countries.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Air freight')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Air freight', N'/eər freɪt/', N'/eər freɪt/', N'noun', N'Vận tải hàng không', N'The company chose air freight for faster delivery.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Sea freight')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Sea freight', N'/siː freɪt/', N'/siː freɪt/', N'noun', N'Vận tải đường biển', N'Sea freight is more economical for large shipments.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Inland freight')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Inland freight', N'/ˈɪn.lænd freɪt/', N'/ˈɪn.lænd freɪt/', N'noun', N'Vận tải nội địa', N'Inland freight services are used to transport goods within the country.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Lead time')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Lead time', N'/ˈliːd ˌtaɪm/', N'/ˈliːd ˌtaɪm/', N'noun', N'Thời gian thực hiện', N'The lead time for this shipment is five days.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Warehouse')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Warehouse', N'/ˈweə.haʊs/', N'/ˈweə.haʊs/', N'noun', N'Kho hàng', N'The goods are stored in the warehouse before shipping.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Insurance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Insurance', N'/ɪnˈʃɔː.rəns/', N'/ɪnˈʃɔː.rəns/', N'noun', N'Bảo hiểm', N'The shipment is covered by insurance against loss or damage.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Overweight charge')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Overweight charge', N'/ˈəʊ.və.weɪt ˌtʃɑːdʒ/', N'/ˈəʊ.və.weɪt ˌtʃɑːdʒ/', N'noun', N'Phí quá tải', N'An overweight charge was applied for the heavy shipment.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_17 AND Word = N'Export declaration')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_17, N'Export declaration', N'/ˈek.spɔːt ˌdek.ləˈreɪ.ʃən/', N'/ˈek.spɔːt ˌdek.ləˈreɪ.ʃən/', N'noun', N'Tờ khai xuất khẩu', N'The exporter submitted the export declaration to customs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_17 AND Prompt = N'Từ "Export declaration" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_17, N'Từ "Export declaration" có nghĩa là gì?', NULL, N'["Công-ten-nơ", "Tờ khai xuất khẩu", "Hàng hóa (trên tàu, máy bay)", "Thông quan"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_17 AND Prompt = N'Từ "Cargo" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_17, N'Từ "Cargo" có nghĩa là gì?', NULL, N'["Mã theo dõi", "Hàng hóa (trên tàu, máy bay)", "Lô hàng", "Vận tải đường biển"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_17 AND Prompt = N'Từ "Freight" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_17, N'Từ "Freight" có nghĩa là gì?', NULL, N'["Bến bốc hàng", "Hàng hóa vận chuyển", "Vận tải đường biển", "Bảo hiểm"]', 1);

-- Chủ đề 18: Xây dựng (Construction) (27 từ)
DECLARE @LessonId_18 INT;
SELECT @LessonId_18 = Id FROM dbo.Lessons WHERE Title = N'Xây dựng (Construction)' AND LanguageCode = 'en';
IF @LessonId_18 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Xây dựng (Construction)', 'en', 'TOEIC 650', 20, 2, 3);
    SET @LessonId_18 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Construction')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Construction', N'/kənˈstrʌk.ʃən/', N'/kənˈstrʌk.ʃən/', N'noun', N'Xây dựng', N'The construction of the new shopping mall will begin next month.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Contractor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Contractor', N'/ˈkɒn.træk.tər/', N'/ˈkɒn.træk.tər/', N'noun', N'Nhà thầu', N'The company hired a reputable contractor for the project.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Blueprint')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Blueprint', N'/ˈbluː.prɪnt/', N'/ˈbluː.prɪnt/', N'noun', N'Bản thiết kế', N'The architect provided a detailed blueprint of the building.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Foundation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Foundation', N'/faʊnˈdeɪ.ʃən/', N'/faʊnˈdeɪ.ʃən/', N'noun', N'Nền móng', N'A strong foundation is essential for tall buildings.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Scaffolding')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Scaffolding', N'/ˈskæf.əl.dɪŋ/', N'/ˈskæf.əl.dɪŋ/', N'noun', N'Giàn giáo', N'The workers set up scaffolding to reach the higher floors.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Excavation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Excavation', N'/ˌek.skəˈveɪ.ʃən/', N'/ˌek.skəˈveɪ.ʃən/', N'noun', N'Sự đào bới, khai quật', N'The excavation of the site began last week.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Cement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Cement', N'/sɪˈment/', N'/sɪˈment/', N'noun', N'Xi măng', N'The cement is mixed with sand and water to create concrete.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Concrete')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Concrete', N'/ˈkɒŋ.kriːt/', N'/ˈkɒŋ.kriːt/', N'noun', N'Bê tông', N'The bridge is made of reinforced concrete.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Brick')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Brick', N'/brɪk/', N'/brɪk/', N'noun', N'Gạch', N'The walls were built using red bricks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Steel')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Steel', N'/stiːl/', N'/stiːl/', N'noun', N'Thép', N'The skyscraper has a strong steel frame.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Crane')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Crane', N'/kreɪn/', N'/kreɪn/', N'noun', N'Cần cẩu', N'A crane was used to lift the heavy materials to the top floor.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Hammer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Hammer', N'/ˈhæm.ər/', N'/ˈhæm.ər/', N'noun', N'Búa', N'He used a hammer to drive the nails into the wood.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Drill')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Drill', N'/drɪl/', N'/drɪl/', N'noun', N'Khoan', N'The workers used an electric drill to make holes in the wall.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Safety helmet')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Safety helmet', N'/ˈseɪf.ti ˌhel.mɪt/', N'/ˈseɪf.ti ˌhel.mɪt/', N'noun', N'Mũ bảo hộ', N'All workers are required to wear safety helmets on site.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Site manager')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Site manager', N'/saɪt ˈmæn.ɪ.dʒər/', N'/saɪt ˈmæn.ɪ.dʒər/', N'noun', N'Quản lý công trường', N'The site manager oversees the daily operations of the construction site.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Plaster')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Plaster', N'/ˈplɑː.stər/', N'/ˈplɑː.stər/', N'noun', N'Thạch cao, vữa', N'The walls were finished with a layer of plaster.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Architect')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Architect', N'/ˈɑː.kɪ.tekt/', N'/ˈɑː.kɪ.tekt/', N'noun', N'Kiến trúc sư', N'The architect designed the new office building.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Engineer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Engineer', N'/ˌen.dʒɪˈnɪər/', N'/ˌen.dʒɪˈnɪər/', N'noun', N'Kỹ sư', N'A structural engineer ensures the building is safe and stable.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Carpenter')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Carpenter', N'/ˈkɑː.pɪn.tər/', N'/ˈkɑː.pɪn.tər/', N'noun', N'Thợ mộc', N'The carpenter installed wooden doors and windows.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Electrician')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Electrician', N'/ɪˌlekˈtrɪʃ.ən/', N'/ɪˌlekˈtrɪʃ.ən/', N'noun', N'Thợ điện', N'The electrician wired the entire building.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Surveyor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Surveyor', N'/səˈveɪ.ər/', N'/səˈveɪ.ər/', N'noun', N'Kỹ sư khảo sát', N'A surveyor measured the land before construction started.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Equipment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Equipment', N'/ɪˈkwɪp.mənt/', N'/ɪˈkwɪp.mənt/', N'noun', N'Thiết bị', N'The workers used heavy equipment to clear the site.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Permit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Permit', N'/ˈpɜː.mɪt/', N'/ˈpɜː.mɪt/', N'noun', N'Giấy phép', N'The construction project requires a building permit.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Inspection')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Inspection', N'/ɪnˈspek.ʃən/', N'/ɪnˈspek.ʃən/', N'noun', N'Sự kiểm tra', N'The building passed the safety inspection last week.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Load-bearing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Load-bearing', N'/ˈləʊd ˌbeə.rɪŋ/', N'/ˈləʊd ˌbeə.rɪŋ/', N'noun', N'Chịu lực', N'The columns are load-bearing to support the structure.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Waterproofing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Waterproofing', N'/ˈwɔː.təˌpruː.fɪŋ/', N'/ˈwɔː.təˌpruː.fɪŋ/', N'noun', N'Chống thấm', N'Waterproofing is crucial for preventing leaks in the foundation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_18 AND Word = N'Flooring')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_18, N'Flooring', N'/ˈflɔː.rɪŋ/', N'/ˈflɔː.rɪŋ/', N'noun', N'Sàn', N'The flooring was installed using high-quality wood.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_18 AND Prompt = N'Từ "Site manager" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_18, N'Từ "Site manager" có nghĩa là gì?', NULL, N'["Kỹ sư khảo sát", "Búa", "Chịu lực", "Quản lý công trường"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_18 AND Prompt = N'Từ "Brick" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_18, N'Từ "Brick" có nghĩa là gì?', NULL, N'["Sự đào bới, khai quật", "Gạch", "Thợ mộc", "Thợ điện"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_18 AND Prompt = N'Từ "Electrician" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_18, N'Từ "Electrician" có nghĩa là gì?', NULL, N'["Kỹ sư", "Búa", "Sự đào bới, khai quật", "Thợ điện"]', 3);

-- Chủ đề 19: Bất động sản (Real Estate) (27 từ)
DECLARE @LessonId_19 INT;
SELECT @LessonId_19 = Id FROM dbo.Lessons WHERE Title = N'Bất động sản (Real Estate)' AND LanguageCode = 'en';
IF @LessonId_19 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Bất động sản (Real Estate)', 'en', 'TOEIC 650', 21, 2, 3);
    SET @LessonId_19 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Real estate')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Real estate', N'/ˈrɪəl ɪˌsteɪt/', N'/ˈrɪəl ɪˌsteɪt/', N'verb', N'Bất động sản', N'Investing in real estate can be very profitable.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Property')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Property', N'/ˈprɒp.ə.ti/', N'/ˈprɒp.ə.ti/', N'noun', N'Tài sản, bất động sản', N'The company purchased a property in the city center.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Landlord')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Landlord', N'/ˈlænd.lɔːd/', N'/ˈlænd.lɔːd/', N'noun', N'Chủ nhà', N'The landlord is responsible for property maintenance.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Tenant')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Tenant', N'/ˈten.ənt/', N'/ˈten.ənt/', N'noun', N'Người thuê', N'The tenant signed a one-year lease agreement.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Lease')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Lease', N'/liːs/', N'/liːs/', N'noun', N'Hợp đồng thuê', N'They signed a lease for the apartment last week.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Rent')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Rent', N'/rent/', N'/rent/', N'noun', N'Tiền thuê, cho thuê', N'The monthly rent for this office is $1,500.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Mortgage')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Mortgage', N'/ˈmɔː.ɡɪdʒ/', N'/ˈmɔː.ɡɪdʒ/', N'noun', N'Thế chấp', N'They applied for a mortgage to buy their first home.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Appraisal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Appraisal', N'/əˈpreɪ.zəl/', N'/əˈpreɪ.zəl/', N'adjective', N'Định giá', N'The appraisal determined the house’s market value.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Realtor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Realtor', N'/ˈrɪə.ltər/', N'/ˈrɪə.ltər/', N'noun', N'Môi giới bất động sản', N'A realtor helped us find our dream home.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Listing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Listing', N'/ˈlɪst.ɪŋ/', N'/ˈlɪst.ɪŋ/', N'noun', N'Danh sách bất động sản', N'The property is on the listing for $250,000.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Closing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Closing', N'/ˈkləʊ.zɪŋ/', N'/ˈkləʊ.zɪŋ/', N'noun', N'Ký kết hợp đồng (mua bán)', N'The closing for the house sale is scheduled for next Friday.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Down payment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Down payment', N'/ˌdaʊn ˈpeɪ.mənt/', N'/ˌdaʊn ˈpeɪ.mənt/', N'noun', N'Tiền đặt cọc', N'A 20% down payment is required to secure the property.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Foreclosure')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Foreclosure', N'/fɔːˈkləʊ.ʒər/', N'/fɔːˈkləʊ.ʒər/', N'noun', N'Tịch thu tài sản thế chấp', N'The bank initiated foreclosure on the house after missed payments.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Commission')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Commission', N'/kəˈmɪʃ.ən/', N'/kəˈmɪʃ.ən/', N'noun', N'Hoa hồng', N'The realtor earns a commission for each property sold.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Deed')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Deed', N'/diːd/', N'/diːd/', N'noun', N'Giấy chứng nhận quyền sở hữu', N'The deed proves ownership of the land.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Equity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Equity', N'/ˈek.wɪ.ti/', N'/ˈek.wɪ.ti/', N'noun', N'Vốn chủ sở hữu', N'Their equity in the property has increased due to market appreciation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Surveyor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Surveyor', N'/səˈveɪ.ər/', N'/səˈveɪ.ər/', N'noun', N'Kỹ sư đo đạc', N'A surveyor assessed the boundaries of the land.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Inspection')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Inspection', N'/ɪnˈspek.ʃən/', N'/ɪnˈspek.ʃən/', N'noun', N'Kiểm tra', N'A home inspection revealed no major issues with the property.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Utilities')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Utilities', N'/juːˈtɪl.ə.tiz/', N'/juːˈtɪl.ə.tiz/', N'noun', N'Dịch vụ tiện ích', N'The monthly rent includes all utilities such as water and electricity.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Deposit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Deposit', N'/dɪˈpɒz.ɪt/', N'/dɪˈpɒz.ɪt/', N'noun', N'Tiền cọc', N'The tenant paid a security deposit before moving in.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Sublet')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Sublet', N'/ˈsʌb.let/', N'/ˈsʌb.let/', N'noun', N'Cho thuê lại', N'The tenant has the right to sublet the property with permission.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Zoning')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Zoning', N'/ˈzəʊ.nɪŋ/', N'/ˈzəʊ.nɪŋ/', N'noun', N'Quy hoạch', N'The land is in a residential zoning area.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Open house')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Open house', N'/ˌəʊ.pən ˈhaʊs/', N'/ˌəʊ.pən ˈhaʊs/', N'noun', N'Nhà mẫu mở cửa cho khách xem', N'The real estate agent hosted an open house for potential buyers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Renovation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Renovation', N'/ˌren.əˈveɪ.ʃən/', N'/ˌren.əˈveɪ.ʃən/', N'noun', N'Cải tạo', N'The property underwent a complete renovation last year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Title')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Title', N'/ˈtaɪ.təl/', N'/ˈtaɪ.təl/', N'noun', N'Quyền sở hữu', N'You must transfer the title when selling the property.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Commercial property')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Commercial property', N'/kəˈmɜː.ʃəl ˈprɒp.ə.ti/', N'/kəˈmɜː.ʃəl ˈprɒp.ə.ti/', N'noun', N'Bất động sản thương mại', N'They are looking to invest in commercial property for their business.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_19 AND Word = N'Residential property')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_19, N'Residential property', N'/ˌrez.ɪˈden.ʃəl ˈprɒp.ə.ti/', N'/ˌrez.ɪˈden.ʃəl ˈprɒp.ə.ti/', N'noun', N'Bất động sản dân cư', N'The neighborhood has affordable residential properties.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_19 AND Prompt = N'Từ "Commission" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_19, N'Từ "Commission" có nghĩa là gì?', NULL, N'["Định giá", "Giấy chứng nhận quyền sở hữu", "Hoa hồng", "Môi giới bất động sản"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_19 AND Prompt = N'Từ "Realtor" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_19, N'Từ "Realtor" có nghĩa là gì?', NULL, N'["Tiền cọc", "Môi giới bất động sản", "Hợp đồng thuê", "Tiền thuê, cho thuê"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_19 AND Prompt = N'Từ "Property" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_19, N'Từ "Property" có nghĩa là gì?', NULL, N'["Tịch thu tài sản thế chấp", "Người thuê", "Tài sản, bất động sản", "Danh sách bất động sản"]', 2);

-- Chủ đề 20: Môi trường (Environment) (25 từ)
DECLARE @LessonId_20 INT;
SELECT @LessonId_20 = Id FROM dbo.Lessons WHERE Title = N'Môi trường (Environment)' AND LanguageCode = 'en';
IF @LessonId_20 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Môi trường (Environment)', 'en', 'TOEIC 650', 22, 2, 3);
    SET @LessonId_20 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Environment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Environment', N'/ɪnˈvaɪ.rən.mənt/', N'/ɪnˈvaɪ.rən.mənt/', N'noun', N'Môi trường', N'Protecting the environment is a global responsibility.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Pollution')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Pollution', N'/pəˈluː.ʃən/', N'/pəˈluː.ʃən/', N'noun', N'Ô nhiễm', N'Air pollution is a serious issue in urban areas.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Climate change')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Climate change', N'/ˈklaɪ.mət ˌtʃeɪndʒ/', N'/ˈklaɪ.mət ˌtʃeɪndʒ/', N'noun', N'Biến đổi khí hậu', N'Climate change affects ecosystems around the world.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Global warming')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Global warming', N'/ˌɡləʊ.bəl ˈwɔː.mɪŋ/', N'/ˌɡləʊ.bəl ˈwɔː.mɪŋ/', N'noun', N'Sự nóng lên toàn cầu', N'Global warming is caused by an increase in greenhouse gases.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Greenhouse effect')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Greenhouse effect', N'/ˈɡriːn.haʊs ɪˌfekt/', N'/ˈɡriːn.haʊs ɪˌfekt/', N'noun', N'Hiệu ứng nhà kính', N'The greenhouse effect traps heat in the Earth’s atmosphere.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Deforestation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Deforestation', N'/ˌdiːˌfɒr.ɪˈsteɪ.ʃən/', N'/ˌdiːˌfɒr.ɪˈsteɪ.ʃən/', N'noun', N'Phá rừng', N'Deforestation leads to habitat loss for many species.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Renewable energy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Renewable energy', N'/rɪˈnjuː.ə.bəl ˈen.ə.dʒi/', N'/rɪˈnjuː.ə.bəl ˈen.ə.dʒi/', N'noun', N'Năng lượng tái tạo', N'Solar and wind are popular sources of renewable energy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Fossil fuels')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Fossil fuels', N'/ˈfɒs.əl ˌfjuː.əlz/', N'/ˈfɒs.əl ˌfjuː.əlz/', N'noun', N'Nhiên liệu hóa thạch', N'Burning fossil fuels contributes to air pollution.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Ecosystem')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Ecosystem', N'/ˈiː.kəʊˌsɪs.təm/', N'/ˈiː.kəʊˌsɪs.təm/', N'noun', N'Hệ sinh thái', N'Coral reefs are important marine ecosystems.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Conservation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Conservation', N'/ˌkɒn.səˈveɪ.ʃən/', N'/ˌkɒn.səˈveɪ.ʃən/', N'noun', N'Bảo tồn', N'Wildlife conservation is essential to prevent species extinction.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Biodiversity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Biodiversity', N'/ˌbaɪ.əʊ.daɪˈvɜː.sɪ.ti/', N'/ˌbaɪ.əʊ.daɪˈvɜː.sɪ.ti/', N'noun', N'Đa dạng sinh học', N'The rainforest is known for its rich biodiversity.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Waste management')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Waste management', N'/weɪst ˈmæn.ɪdʒ.mənt/', N'/weɪst ˈmæn.ɪdʒ.mənt/', N'noun', N'Quản lý chất thải', N'Proper waste management reduces environmental pollution.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Recycling')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Recycling', N'/ˌriːˈsaɪ.klɪŋ/', N'/ˌriːˈsaɪ.klɪŋ/', N'noun', N'Tái chế', N'The company promotes recycling programs for employees.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Sustainable')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Sustainable', N'/səˈsteɪ.nə.bəl/', N'/səˈsteɪ.nə.bəl/', N'adjective', N'Bền vững', N'The factory has adopted sustainable practices to reduce waste.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Habitat')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Habitat', N'/ˈhæb.ɪ.tæt/', N'/ˈhæb.ɪ.tæt/', N'noun', N'Môi trường sống', N'Urban development is threatening the natural habitat of wildlife.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Emissions')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Emissions', N'/ɪˈmɪʃ.ənz/', N'/ɪˈmɪʃ.ənz/', N'noun', N'Khí thải', N'Reducing carbon emissions is a priority for many countries.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Carbon footprint')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Carbon footprint', N'/ˈkɑː.bən ˈfʊt.prɪnt/', N'/ˈkɑː.bən ˈfʊt.prɪnt/', N'noun', N'Dấu chân carbon', N'Using public transport helps lower your carbon footprint.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Natural resources')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Natural resources', N'/ˈnætʃ.ər.əl rɪˈzɔː.sɪz/', N'/ˈnætʃ.ər.əl rɪˈzɔː.sɪz/', N'noun', N'Tài nguyên thiên nhiên', N'Water and forests are valuable natural resources.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Landfill')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Landfill', N'/ˈlænd.fɪl/', N'/ˈlænd.fɪl/', N'noun', N'Bãi rác', N'Most of the city’s waste ends up in a landfill.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Renewable resources')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Renewable resources', N'/rɪˈnjuː.ə.bəl rɪˈzɔː.sɪz/', N'/rɪˈnjuː.ə.bəl rɪˈzɔː.sɪz/', N'noun', N'Tài nguyên tái tạo', N'Trees are renewable resources if managed properly.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Ozone layer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Ozone layer', N'/ˈəʊ.zəʊn ˌleɪ.ər/', N'/ˈəʊ.zəʊn ˌleɪ.ər/', N'noun', N'Tầng ozone', N'The ozone layer protects the Earth from harmful UV rays.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Environmentalist')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Environmentalist', N'/ɪnˌvaɪ.rənˈmen.təl.ɪst/', N'/ɪnˌvaɪ.rənˈmen.təl.ɪst/', N'noun', N'Nhà môi trường học', N'Environmentalists advocate for reducing pollution.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Water scarcity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Water scarcity', N'/ˈwɔː.tər ˈskeə.sɪ.ti/', N'/ˈwɔː.tər ˈskeə.sɪ.ti/', N'noun', N'Sự khan hiếm nước', N'Water scarcity affects many developing countries.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Afforestation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Afforestation', N'/ˌæf.ɒr.ɪˈsteɪ.ʃən/', N'/ˌæf.ɒr.ɪˈsteɪ.ʃən/', N'noun', N'Trồng rừng', N'Afforestation can help combat desertification.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_20 AND Word = N'Compost')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_20, N'Compost', N'/ˈkɒm.pɒst/', N'/ˈkɒm.pɒst/', N'noun', N'Phân hữu cơ', N'Kitchen scraps can be turned into compost for gardening.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_20 AND Prompt = N'Từ "Renewable energy" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_20, N'Từ "Renewable energy" có nghĩa là gì?', NULL, N'["Tái chế", "Năng lượng tái tạo", "Khí thải", "Bãi rác"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_20 AND Prompt = N'Từ "Sustainable" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_20, N'Từ "Sustainable" có nghĩa là gì?', NULL, N'["Tài nguyên thiên nhiên", "Dấu chân carbon", "Bền vững", "Tái chế"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_20 AND Prompt = N'Từ "Habitat" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_20, N'Từ "Habitat" có nghĩa là gì?', NULL, N'["Môi trường sống", "Đa dạng sinh học", "Biến đổi khí hậu", "Dấu chân carbon"]', 0);

-- Chủ đề 21: Thời tiết (Weather) (28 từ)
DECLARE @LessonId_21 INT;
SELECT @LessonId_21 = Id FROM dbo.Lessons WHERE Title = N'Thời tiết (Weather)' AND LanguageCode = 'en';
IF @LessonId_21 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Thời tiết (Weather)', 'en', 'TOEIC 650', 23, 2, 3);
    SET @LessonId_21 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Weather')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Weather', N'/ˈweð.ər/', N'/ˈweð.ər/', N'noun', N'Thời tiết', N'The weather forecast predicts rain for tomorrow.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Temperature')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Temperature', N'/ˈtem.prə.tʃər/', N'/ˈtem.prə.tʃər/', N'noun', N'Nhiệt độ', N'The temperature dropped significantly overnight.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Forecast')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Forecast', N'/ˈfɔː.kɑːst/', N'/ˈfɔː.kɑːst/', N'noun', N'Dự báo', N'The weather forecast says it will be sunny all week.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Climate')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Climate', N'/ˈklaɪ.mət/', N'/ˈklaɪ.mət/', N'verb', N'Khí hậu', N'The desert has a very dry climate.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Humidity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Humidity', N'/hjuːˈmɪd.ɪ.ti/', N'/hjuːˈmɪd.ɪ.ti/', N'noun', N'Độ ẩm', N'The humidity level is high during the summer months.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Rainfall')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Rainfall', N'/ˈreɪn.fɔːl/', N'/ˈreɪn.fɔːl/', N'noun', N'Lượng mưa', N'The area receives heavy rainfall in the monsoon season.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Sunny')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Sunny', N'/ˈsʌn.i/', N'/ˈsʌn.i/', N'noun', N'Nắng', N'It’s a bright and sunny day.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Cloudy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Cloudy', N'/ˈklaʊ.di/', N'/ˈklaʊ.di/', N'noun', N'Nhiều mây', N'The sky is cloudy, but no rain is expected.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Storm')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Storm', N'/stɔːm/', N'/stɔːm/', N'noun', N'Cơn bão', N'A severe storm caused damage across the region.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Thunderstorm')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Thunderstorm', N'/ˈθʌn.də.stɔːm/', N'/ˈθʌn.də.stɔːm/', N'noun', N'Bão có sấm sét', N'The thunderstorm was accompanied by strong winds.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Snow')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Snow', N'/snəʊ/', N'/snəʊ/', N'noun', N'Tuyết', N'It rarely snows in tropical countries.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Windy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Windy', N'/ˈwɪn.di/', N'/ˈwɪn.di/', N'noun', N'Có gió', N'It’s too windy to go outside without a jacket.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Foggy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Foggy', N'/ˈfɒɡ.i/', N'/ˈfɒɡ.i/', N'noun', N'Có sương mù', N'Driving in foggy weather can be dangerous.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Hail')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Hail', N'/heɪl/', N'/heɪl/', N'noun', N'Mưa đá', N'The storm brought hail the size of golf balls.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Drizzle')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Drizzle', N'/ˈdrɪz.əl/', N'/ˈdrɪz.əl/', N'noun', N'Mưa phùn', N'There’s a light drizzle outside, so you might need an umbrella.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Heatwave')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Heatwave', N'/ˈhiːt.weɪv/', N'/ˈhiːt.weɪv/', N'noun', N'Đợt nắng nóng', N'The city experienced a heatwave that lasted two weeks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Cold front')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Cold front', N'/ˈkəʊld ˌfrʌnt/', N'/ˈkəʊld ˌfrʌnt/', N'noun', N'Khối không khí lạnh', N'A cold front is moving in from the north.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Hurricane')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Hurricane', N'/ˈhʌr.ɪ.kən/', N'/ˈhʌr.ɪ.kən/', N'noun', N'Bão lớn (nhiệt đới)', N'The hurricane caused widespread flooding and damage.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Tornado')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Tornado', N'/tɔːˈneɪ.dəʊ/', N'/tɔːˈneɪ.dəʊ/', N'noun', N'Lốc xoáy', N'A powerful tornado destroyed homes in the area.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Blizzard')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Blizzard', N'/ˈblɪz.əd/', N'/ˈblɪz.əd/', N'noun', N'Bão tuyết', N'The blizzard left several feet of snow on the ground.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Drought')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Drought', N'/draʊt/', N'/draʊt/', N'noun', N'Hạn hán', N'The prolonged drought affected crop production.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Frost')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Frost', N'/frɒst/', N'/frɒst/', N'noun', N'Sương giá', N'There’s a layer of frost on the car windows this morning.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Gale')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Gale', N'/ɡeɪl/', N'/ɡeɪl/', N'noun', N'Gió mạnh', N'The boat was caught in a gale while at sea.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Lightning')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Lightning', N'/ˈlaɪt.nɪŋ/', N'/ˈlaɪt.nɪŋ/', N'noun', N'Sét', N'The lightning struck a tree near the house.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Ice storm')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Ice storm', N'/ˈaɪs ˌstɔːm/', N'/ˈaɪs ˌstɔːm/', N'noun', N'Bão băng', N'An ice storm can cause dangerous road conditions.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Overcast')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Overcast', N'/ˈəʊ.və.kɑːst/', N'/ˈəʊ.və.kɑːst/', N'noun', N'U ám', N'The sky is overcast, and it looks like it might rain.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'UV index')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'UV index', N'/ˌjuːˈviː ˈɪn.deks/', N'/ˌjuːˈviː ˈɪn.deks/', N'noun', N'Chỉ số UV', N'The UV index is very high today, so wear sunscreen.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_21 AND Word = N'Breeze')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_21, N'Breeze', N'/briːz/', N'/briːz/', N'noun', N'Gió nhẹ', N'A cool breeze is blowing from the ocean.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_21 AND Prompt = N'Từ "Weather" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_21, N'Từ "Weather" có nghĩa là gì?', NULL, N'["Thời tiết", "Có gió", "Lượng mưa", "Gió nhẹ"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_21 AND Prompt = N'Từ "Gale" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_21, N'Từ "Gale" có nghĩa là gì?', NULL, N'["Có sương mù", "Gió mạnh", "Bão tuyết", "Độ ẩm"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_21 AND Prompt = N'Từ "Drought" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_21, N'Từ "Drought" có nghĩa là gì?', NULL, N'["Lốc xoáy", "Khối không khí lạnh", "Hạn hán", "Mưa đá"]', 2);

-- Chủ đề 22: Pháp luật (Law) (29 từ)
DECLARE @LessonId_22 INT;
SELECT @LessonId_22 = Id FROM dbo.Lessons WHERE Title = N'Pháp luật (Law)' AND LanguageCode = 'en';
IF @LessonId_22 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Pháp luật (Law)', 'en', 'TOEIC 650', 24, 2, 3);
    SET @LessonId_22 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Law')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Law', N'/lɔː/', N'/lɔː/', N'noun', N'Luật, pháp luật', N'Everyone must abide by the law.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Regulation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Regulation', N'/ˌreɡ.jəˈleɪ.ʃən/', N'/ˌreɡ.jəˈleɪ.ʃən/', N'noun', N'Quy định', N'New regulations on data privacy were introduced last year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Legislation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Legislation', N'/ˌledʒ.ɪˈsleɪ.ʃən/', N'/ˌledʒ.ɪˈsleɪ.ʃən/', N'noun', N'Pháp luật, luật ban hành', N'The government is drafting new legislation on environmental protection.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Attorney')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Attorney', N'/əˈtɜː.ni/', N'/əˈtɜː.ni/', N'noun', N'Luật sư', N'The attorney represented the client in court.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Lawyer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Lawyer', N'/ˈlɔɪ.ər/', N'/ˈlɔɪ.ər/', N'noun', N'Luật sư', N'She consulted a lawyer before signing the contract.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Contract')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Contract', N'/ˈkɒn.trækt/', N'/ˈkɒn.trækt/', N'noun', N'Hợp đồng', N'Both parties signed the contract yesterday.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Agreement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Agreement', N'/əˈɡriː.mənt/', N'/əˈɡriː.mənt/', N'noun', N'Thỏa thuận', N'The two companies reached an agreement on the terms.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Clause')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Clause', N'/klɔːz/', N'/klɔːz/', N'noun', N'Điều khoản', N'The clause in the contract specifies the payment schedule.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Fine')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Fine', N'/faɪn/', N'/faɪn/', N'noun', N'Tiền phạt', N'The company was issued a fine for violating safety regulations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Penalty')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Penalty', N'/ˈpen.əl.ti/', N'/ˈpen.əl.ti/', N'noun', N'Hình phạt', N'A heavy penalty was imposed for breaking the law.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Prosecution')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Prosecution', N'/ˌprɒs.ɪˈkjuː.ʃən/', N'/ˌprɒs.ɪˈkjuː.ʃən/', N'noun', N'Sự truy tố', N'The prosecution presented strong evidence in court.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Defendant')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Defendant', N'/dɪˈfen.dənt/', N'/dɪˈfen.dənt/', N'noun', N'Bị cáo', N'The defendant pleaded not guilty to the charges.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Plaintiff')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Plaintiff', N'/ˈpleɪn.tɪf/', N'/ˈpleɪn.tɪf/', N'noun', N'Nguyên đơn', N'The plaintiff filed a lawsuit against the company.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Evidence')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Evidence', N'/ˈev.ɪ.dəns/', N'/ˈev.ɪ.dəns/', N'noun', N'Bằng chứng', N'The lawyer presented strong evidence to support the case.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Witness')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Witness', N'/ˈwɪt.nəs/', N'/ˈwɪt.nəs/', N'noun', N'Nhân chứng', N'The witness testified in court about what they saw.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Verdict')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Verdict', N'/ˈvɜː.dɪkt/', N'/ˈvɜː.dɪkt/', N'noun', N'Lời tuyên án', N'The jury reached a verdict of guilty.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Judge')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Judge', N'/dʒʌdʒ/', N'/dʒʌdʒ/', N'noun', N'Thẩm phán', N'The judge sentenced the defendant to five years in prison.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Trial')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Trial', N'/ˈtraɪ.əl/', N'/ˈtraɪ.əl/', N'adjective', N'Phiên tòa', N'The trial is scheduled to begin next week.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Jury')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Jury', N'/ˈdʒʊə.ri/', N'/ˈdʒʊə.ri/', N'noun', N'Ban bồi thẩm', N'The jury deliberated for hours before reaching a verdict.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Lawsuit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Lawsuit', N'/ˈlɔː.suːt/', N'/ˈlɔː.suːt/', N'noun', N'Vụ kiện', N'The company faced a lawsuit over patent infringement.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Liability')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Liability', N'/ˌlaɪ.əˈbɪl.ɪ.ti/', N'/ˌlaɪ.əˈbɪl.ɪ.ti/', N'noun', N'Trách nhiệm pháp lý', N'The company denied any liability for the accident.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Copyright')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Copyright', N'/ˈkɒp.i.raɪt/', N'/ˈkɒp.i.raɪt/', N'noun', N'Bản quyền', N'The artist sued for copyright infringement.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Trademark')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Trademark', N'/ˈtreɪd.mɑːk/', N'/ˈtreɪd.mɑːk/', N'noun', N'Thương hiệu', N'The logo is a registered trademark of the company.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Patent')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Patent', N'/ˈpeɪ.tənt/', N'/ˈpeɪ.tənt/', N'noun', N'Bằng sáng chế', N'The inventor applied for a patent for their new device.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Compliance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Compliance', N'/kəmˈplaɪ.əns/', N'/kəmˈplaɪ.əns/', N'noun', N'Sự tuân thủ', N'The company must ensure compliance with industry regulations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Breach')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Breach', N'/briːtʃ/', N'/briːtʃ/', N'noun', N'Sự vi phạm', N'There was a breach of contract by one of the parties.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Appeal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Appeal', N'/əˈpiːl/', N'/əˈpiːl/', N'adjective', N'Kháng cáo', N'The defendant filed an appeal against the court’s decision.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Arbitration')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Arbitration', N'/ˌɑː.bɪˈtreɪ.ʃən/', N'/ˌɑː.bɪˈtreɪ.ʃən/', N'noun', N'Trọng tài', N'The dispute was resolved through arbitration instead of court.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_22 AND Word = N'Crime')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_22, N'Crime', N'/kraɪm/', N'/kraɪm/', N'noun', N'Tội phạm, tội danh', N'The police are investigating the crime scene.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_22 AND Prompt = N'Từ "Jury" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_22, N'Từ "Jury" có nghĩa là gì?', NULL, N'["Ban bồi thẩm", "Nhân chứng", "Pháp luật, luật ban hành", "Bằng sáng chế"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_22 AND Prompt = N'Từ "Compliance" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_22, N'Từ "Compliance" có nghĩa là gì?', NULL, N'["Quy định", "Trách nhiệm pháp lý", "Sự tuân thủ", "Pháp luật, luật ban hành"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_22 AND Prompt = N'Từ "Prosecution" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_22, N'Từ "Prosecution" có nghĩa là gì?', NULL, N'["Vụ kiện", "Thương hiệu", "Bằng sáng chế", "Sự truy tố"]', 3);

-- Chủ đề 23: Bảo hiểm (Insurance) (25 từ)
DECLARE @LessonId_23 INT;
SELECT @LessonId_23 = Id FROM dbo.Lessons WHERE Title = N'Bảo hiểm (Insurance)' AND LanguageCode = 'en';
IF @LessonId_23 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Bảo hiểm (Insurance)', 'en', 'TOEIC 650', 25, 2, 3);
    SET @LessonId_23 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Insurance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Insurance', N'/ɪnˈʃʊə.rəns/', N'/ɪnˈʃʊə.rəns/', N'noun', N'Bảo hiểm', N'Having health insurance is essential for unexpected medical costs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Policy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Policy', N'/ˈpɒl.ə.si/', N'/ˈpɒl.ə.si/', N'noun', N'Chính sách, hợp đồng bảo hiểm', N'The company updated its insurance policy to include more coverage.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Premium')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Premium', N'/ˈpriː.mi.əm/', N'/ˈpriː.mi.əm/', N'noun', N'Phí bảo hiểm', N'The monthly premium for car insurance is $100.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Claim')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Claim', N'/kleɪm/', N'/kleɪm/', N'noun', N'Yêu cầu bồi thường', N'He filed an insurance claim after the accident.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Coverage')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Coverage', N'/ˈkʌv.ər.ɪdʒ/', N'/ˈkʌv.ər.ɪdʒ/', N'noun', N'Mức bảo hiểm, phạm vi bảo hiểm', N'This policy offers comprehensive coverage for medical expenses.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Deductible')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Deductible', N'/dɪˈdʌk.tɪ.bəl/', N'/dɪˈdʌk.tɪ.bəl/', N'adjective', N'Khoản khấu trừ', N'You must pay the deductible before the insurance starts covering costs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Liability')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Liability', N'/ˌlaɪ.əˈbɪl.ɪ.ti/', N'/ˌlaɪ.əˈbɪl.ɪ.ti/', N'noun', N'Trách nhiệm pháp lý', N'The policy includes liability coverage for third-party damage.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Beneficiary')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Beneficiary', N'/ˌben.ɪˈfɪʃ.ər.i/', N'/ˌben.ɪˈfɪʃ.ər.i/', N'noun', N'Người thụ hưởng', N'The beneficiary of the life insurance policy is his spouse.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Underwriter')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Underwriter', N'/ˈʌn.dəˌraɪ.tər/', N'/ˈʌn.dəˌraɪ.tər/', N'noun', N'Người thẩm định bảo hiểm', N'The underwriter assesses the risk of insuring the applicant.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Renewal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Renewal', N'/rɪˈnjuː.əl/', N'/rɪˈnjuː.əl/', N'adjective', N'Gia hạn', N'The renewal of the policy is due next month.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Term')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Term', N'/tɜːm/', N'/tɜːm/', N'noun', N'Thời hạn bảo hiểm', N'This is a 10-year term life insurance policy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Exclusion')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Exclusion', N'/ɪkˈskluː.ʒən/', N'/ɪkˈskluː.ʒən/', N'noun', N'Loại trừ', N'Pre-existing conditions are listed as exclusions in the policy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Broker')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Broker', N'/ˈbrəʊ.kər/', N'/ˈbrəʊ.kər/', N'noun', N'Môi giới bảo hiểm', N'The insurance broker helped me find the best plan.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Actuary')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Actuary', N'/ˈæk.tʃu.ər.i/', N'/ˈæk.tʃu.ər.i/', N'noun', N'Chuyên gia tính toán bảo hiểm', N'An actuary calculates insurance risks and premiums.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Third-party')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Third-party', N'/ˌθɜːdˈpɑː.ti/', N'/ˌθɜːdˈpɑː.ti/', N'noun', N'Bên thứ ba', N'Third-party insurance covers damages caused to others.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Comprehensive')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Comprehensive', N'/ˌkɒm.prɪˈhen.sɪv/', N'/ˌkɒm.prɪˈhen.sɪv/', N'adjective', N'Toàn diện, bao quát', N'A comprehensive policy includes both damage and theft coverage.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Risk assessment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Risk assessment', N'/rɪsk əˈses.mənt/', N'/rɪsk əˈses.mənt/', N'noun', N'Đánh giá rủi ro', N'The company performed a risk assessment before offering coverage.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Termination')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Termination', N'/ˌtɜː.mɪˈneɪ.ʃən/', N'/ˌtɜː.mɪˈneɪ.ʃən/', N'noun', N'Chấm dứt hợp đồng bảo hiểm', N'Failure to pay premiums may result in policy termination.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Coverage limit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Coverage limit', N'/ˈkʌv.ər.ɪdʒ ˈlɪm.ɪt/', N'/ˈkʌv.ər.ɪdʒ ˈlɪm.ɪt/', N'noun', N'Giới hạn bảo hiểm', N'The coverage limit for this plan is $500,000.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Claim adjuster')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Claim adjuster', N'/kleɪm əˈdʒʌs.tər/', N'/kleɪm əˈdʒʌs.tər/', N'noun', N'Nhân viên giám định bồi thường', N'A claim adjuster investigates the damage and determines compensation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Payout')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Payout', N'/ˈpeɪ.aʊt/', N'/ˈpeɪ.aʊt/', N'noun', N'Khoản thanh toán bảo hiểm', N'The payout was delayed due to missing documents.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Policyholder')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Policyholder', N'/ˈpɒl.ɪ.si ˌhəʊl.dər/', N'/ˈpɒl.ɪ.si ˌhəʊl.dər/', N'noun', N'Người sở hữu hợp đồng bảo hiểm', N'The policyholder is entitled to all benefits listed in the policy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Reimbursement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Reimbursement', N'/ˌriː.ɪmˈbɜːs.mənt/', N'/ˌriː.ɪmˈbɜːs.mənt/', N'noun', N'Hoàn trả', N'The insurance reimbursement covered all medical expenses.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Endorsement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Endorsement', N'/ɪnˈdɔːs.mənt/', N'/ɪnˈdɔːs.mənt/', N'noun', N'Bản bổ sung hợp đồng', N'An endorsement was added to extend the coverage.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_23 AND Word = N'Fraud')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_23, N'Fraud', N'/frɔːd/', N'/frɔːd/', N'noun', N'Gian lận', N'The company detected insurance fraud and reported it to the authorities.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_23 AND Prompt = N'Từ "Policy" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_23, N'Từ "Policy" có nghĩa là gì?', NULL, N'["Chính sách, hợp đồng bảo hiểm", "Đánh giá rủi ro", "Nhân viên giám định bồi thường", "Loại trừ"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_23 AND Prompt = N'Từ "Term" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_23, N'Từ "Term" có nghĩa là gì?', NULL, N'["Người sở hữu hợp đồng bảo hiểm", "Gia hạn", "Khoản thanh toán bảo hiểm", "Thời hạn bảo hiểm"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_23 AND Prompt = N'Từ "Policyholder" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_23, N'Từ "Policyholder" có nghĩa là gì?', NULL, N'["Khoản khấu trừ", "Gia hạn", "Môi giới bảo hiểm", "Người sở hữu hợp đồng bảo hiểm"]', 3);

-- Chủ đề 24: Sản xuất (Manufacturing) (26 từ)
DECLARE @LessonId_24 INT;
SELECT @LessonId_24 = Id FROM dbo.Lessons WHERE Title = N'Sản xuất (Manufacturing)' AND LanguageCode = 'en';
IF @LessonId_24 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Sản xuất (Manufacturing)', 'en', 'TOEIC 650', 26, 2, 3);
    SET @LessonId_24 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Manufacturing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Manufacturing', N'/ˌmæn.jəˈfæk.tʃər.ɪŋ/', N'/ˌmæn.jəˈfæk.tʃər.ɪŋ/', N'noun', N'Sản xuất', N'The company specializes in manufacturing electronic devices.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Factory')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Factory', N'/ˈfæk.tər.i/', N'/ˈfæk.tər.i/', N'noun', N'Nhà máy', N'The new factory will create over 500 jobs in the area.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Production')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Production', N'/prəˈdʌk.ʃən/', N'/prəˈdʌk.ʃən/', N'noun', N'Sự sản xuất', N'The production of cars increased by 20% this year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Assembly line')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Assembly line', N'/əˈsem.bli ˌlaɪn/', N'/əˈsem.bli ˌlaɪn/', N'noun', N'Dây chuyền lắp ráp', N'Products are put together on the assembly line.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Machinery')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Machinery', N'/məˈʃiː.nər.i/', N'/məˈʃiː.nər.i/', N'noun', N'Máy móc', N'The factory invested in modern machinery to boost efficiency.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Equipment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Equipment', N'/ɪˈkwɪp.mənt/', N'/ɪˈkwɪp.mənt/', N'noun', N'Thiết bị', N'Safety equipment is mandatory for all workers in the plant.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Raw materials')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Raw materials', N'/rɔː məˈtɪə.ri.əlz/', N'/rɔː məˈtɪə.ri.əlz/', N'noun', N'Nguyên liệu thô', N'The factory imports raw materials from overseas suppliers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Output')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Output', N'/ˈaʊt.pʊt/', N'/ˈaʊt.pʊt/', N'noun', N'Sản lượng', N'The factory’s daily output is 1,000 units.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Quality control')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Quality control', N'/ˈkwɒl.ɪ.ti kənˈtrəʊl/', N'/ˈkwɒl.ɪ.ti kənˈtrəʊl/', N'noun', N'Kiểm soát chất lượng', N'Quality control ensures that products meet industry standards.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Inventory')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Inventory', N'/ˈɪn.vən.tər.i/', N'/ˈɪn.vən.tər.i/', N'noun', N'Hàng tồn kho', N'The company maintains a high level of inventory to meet demand.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Batch')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Batch', N'/bætʃ/', N'/bætʃ/', N'noun', N'Lô, đợt', N'This batch of products will be shipped to Europe.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Supplier')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Supplier', N'/səˈplaɪ.ər/', N'/səˈplaɪ.ər/', N'noun', N'Nhà cung cấp', N'The factory relies on a reliable supplier for raw materials.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Logistics')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Logistics', N'/ləˈdʒɪs.tɪks/', N'/ləˈdʒɪs.tɪks/', N'noun', N'Hậu cần', N'Efficient logistics are critical for timely delivery of goods.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Automation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Automation', N'/ˌɔː.təˈmeɪ.ʃən/', N'/ˌɔː.təˈmeɪ.ʃən/', N'noun', N'Tự động hóa', N'The factory has adopted automation to reduce labor costs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Efficiency')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Efficiency', N'/ɪˈfɪʃ.ən.si/', N'/ɪˈfɪʃ.ən.si/', N'noun', N'Hiệu quả', N'The new process has greatly improved production efficiency.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Downtime')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Downtime', N'/ˈdaʊn.taɪm/', N'/ˈdaʊn.taɪm/', N'noun', N'Thời gian ngừng hoạt động', N'The factory experienced minimal downtime during the upgrade.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Assembly')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Assembly', N'/əˈsem.bli/', N'/əˈsem.bli/', N'adverb', N'Lắp ráp', N'The assembly of the product requires skilled workers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Packaging')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Packaging', N'/ˈpæk.ɪ.dʒɪŋ/', N'/ˈpæk.ɪ.dʒɪŋ/', N'noun', N'Đóng gói', N'The packaging process ensures products are secure for shipping.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Customization')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Customization', N'/ˌkʌs.tə.maɪˈzeɪ.ʃən/', N'/ˌkʌs.tə.maɪˈzeɪ.ʃən/', N'noun', N'Tùy chỉnh', N'The factory offers product customization to meet client needs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Distribution')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Distribution', N'/ˌdɪs.trɪˈbjuː.ʃən/', N'/ˌdɪs.trɪˈbjuː.ʃən/', N'noun', N'Phân phối', N'The products are ready for distribution to retailers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Maintenance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Maintenance', N'/ˈmeɪn.tən.əns/', N'/ˈmeɪn.tən.əns/', N'noun', N'Bảo trì', N'Regular maintenance of machines prevents breakdowns.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Defect')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Defect', N'/ˈdiː.fekt/', N'/ˈdiː.fekt/', N'noun', N'Lỗi sản phẩm', N'The defect rate has decreased significantly since the new inspection system.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Workforce')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Workforce', N'/ˈwɜːk.fɔːs/', N'/ˈwɜːk.fɔːs/', N'noun', N'Lực lượng lao động', N'The factory employs a skilled workforce of 200 workers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Mass production')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Mass production', N'/mæs prəˈdʌk.ʃən/', N'/mæs prəˈdʌk.ʃən/', N'noun', N'Sản xuất hàng loạt', N'Mass production allows for lower costs per unit.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Assembly plant')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Assembly plant', N'/əˈsem.bli ˌplɑːnt/', N'/əˈsem.bli ˌplɑːnt/', N'noun', N'Nhà máy lắp ráp', N'The car assembly plant is one of the largest in the country.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_24 AND Word = N'Operational cost')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_24, N'Operational cost', N'/ˌɒp.ərˈeɪ.ʃən.əl kɒst/', N'/ˌɒp.ərˈeɪ.ʃən.əl kɒst/', N'noun', N'Chi phí vận hành', N'Reducing operational costs can increase profitability.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_24 AND Prompt = N'Từ "Assembly" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_24, N'Từ "Assembly" có nghĩa là gì?', NULL, N'["Sự sản xuất", "Sản xuất hàng loạt", "Chi phí vận hành", "Lắp ráp"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_24 AND Prompt = N'Từ "Efficiency" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_24, N'Từ "Efficiency" có nghĩa là gì?', NULL, N'["Lực lượng lao động", "Hiệu quả", "Dây chuyền lắp ráp", "Phân phối"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_24 AND Prompt = N'Từ "Batch" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_24, N'Từ "Batch" có nghĩa là gì?', NULL, N'["Nhà cung cấp", "Lô, đợt", "Kiểm soát chất lượng", "Tùy chỉnh"]', 1);

-- Chủ đề 25: Chuỗi cung ứng (Supply Chain) (23 từ)
DECLARE @LessonId_25 INT;
SELECT @LessonId_25 = Id FROM dbo.Lessons WHERE Title = N'Chuỗi cung ứng (Supply Chain)' AND LanguageCode = 'en';
IF @LessonId_25 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Chuỗi cung ứng (Supply Chain)', 'en', 'TOEIC 650', 27, 2, 3);
    SET @LessonId_25 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Supply chain')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Supply chain', N'/səˈplaɪ ˌtʃeɪn/', N'/səˈplaɪ ˌtʃeɪn/', N'noun', N'Chuỗi cung ứng', N'The company optimized its supply chain to reduce costs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Logistics')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Logistics', N'/ləˈdʒɪs.tɪks/', N'/ləˈdʒɪs.tɪks/', N'noun', N'Hậu cần', N'Efficient logistics ensure timely delivery of products.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Procurement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Procurement', N'/prəˈkjʊə.mənt/', N'/prəˈkjʊə.mənt/', N'noun', N'Mua sắm', N'The procurement team handles the purchasing of raw materials.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Supplier')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Supplier', N'/səˈplaɪ.ər/', N'/səˈplaɪ.ər/', N'noun', N'Nhà cung cấp', N'We are looking for reliable suppliers for our raw materials.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Distribution')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Distribution', N'/ˌdɪs.trɪˈbjuː.ʃən/', N'/ˌdɪs.trɪˈbjuː.ʃən/', N'noun', N'Phân phối', N'The company manages the distribution of goods across the region.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Inventory')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Inventory', N'/ˈɪn.vən.tər.i/', N'/ˈɪn.vən.tər.i/', N'noun', N'Hàng tồn kho', N'The factory maintains a high level of inventory to meet demand.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Warehouse')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Warehouse', N'/ˈweə.haʊs/', N'/ˈweə.haʊs/', N'noun', N'Kho hàng', N'Goods are stored in the warehouse before being shipped.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Freight')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Freight', N'/freɪt/', N'/freɪt/', N'noun', N'Hàng hóa vận chuyển', N'The freight arrived at the port on time.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Transportation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Transportation', N'/ˌtræn.spɔːˈteɪ.ʃən/', N'/ˌtræn.spɔːˈteɪ.ʃən/', N'noun', N'Vận tải', N'Transportation costs make up a significant portion of supply chain expenses.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Demand planning')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Demand planning', N'/dɪˈmænd ˌplæn.ɪŋ/', N'/dɪˈmænd ˌplæn.ɪŋ/', N'noun', N'Lập kế hoạch nhu cầu', N'Accurate demand planning helps avoid overproduction.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Lead time')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Lead time', N'/ˈliːd ˌtaɪm/', N'/ˈliːd ˌtaɪm/', N'noun', N'Thời gian thực hiện', N'Reducing the lead time improves customer satisfaction.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Batch')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Batch', N'/bætʃ/', N'/bætʃ/', N'noun', N'Lô, đợt', N'This batch of products will be shipped tomorrow.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Shipment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Shipment', N'/ˈʃɪp.mənt/', N'/ˈʃɪp.mənt/', N'noun', N'Lô hàng', N'The shipment is expected to arrive by next week.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Customs clearance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Customs clearance', N'/ˈkʌs.təmz ˈklɪə.rəns/', N'/ˈkʌs.təmz ˈklɪə.rəns/', N'noun', N'Thông quan', N'The goods are delayed due to customs clearance procedures.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Supply chain management')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Supply chain management', N'/səˈplaɪ tʃeɪn ˈmæn.ɪdʒ.mənt/', N'/səˈplaɪ tʃeɪn ˈmæn.ɪdʒ.mənt/', N'noun', N'Quản lý chuỗi cung ứng', N'Effective supply chain management reduces operational costs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Stockout')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Stockout', N'/ˈstɒk.aʊt/', N'/ˈstɒk.aʊt/', N'noun', N'Hết hàng', N'A stockout can result in lost sales and dissatisfied customers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Forecasting')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Forecasting', N'/ˈfɔː.kɑː.stɪŋ/', N'/ˈfɔː.kɑː.stɪŋ/', N'noun', N'Dự báo', N'Forecasting helps predict demand and avoid excess inventory.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Reverse logistics')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Reverse logistics', N'/rɪˈvɜːs ləˈdʒɪs.tɪks/', N'/rɪˈvɜːs ləˈdʒɪs.tɪks/', N'noun', N'Logistics ngược', N'Reverse logistics involves handling product returns or recycling.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Vendor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Vendor', N'/ˈven.dər/', N'/ˈven.dər/', N'noun', N'Nhà cung ứng, người bán', N'The company negotiates prices with multiple vendors.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Order fulfillment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Order fulfillment', N'/ˈɔː.dər fʊlˈfɪl.mənt/', N'/ˈɔː.dər fʊlˈfɪl.mənt/', N'noun', N'Hoàn thành đơn hàng', N'Fast order fulfillment improves customer satisfaction.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Tracking')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Tracking', N'/ˈtræk.ɪŋ/', N'/ˈtræk.ɪŋ/', N'noun', N'Theo dõi', N'The shipment’s tracking information is updated in real time.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Cold chain')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Cold chain', N'/ˈkəʊld ˌtʃeɪn/', N'/ˈkəʊld ˌtʃeɪn/', N'noun', N'Chuỗi lạnh', N'Cold chain logistics are essential for transporting perishable goods.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_25 AND Word = N'Optimization')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_25, N'Optimization', N'/ˌɒp.tɪ.maɪˈzeɪ.ʃən/', N'/ˌɒp.tɪ.maɪˈzeɪ.ʃən/', N'noun', N'Tối ưu hóa', N'The team focuses on optimization of the supply chain to reduce costs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_25 AND Prompt = N'Từ "Lead time" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_25, N'Từ "Lead time" có nghĩa là gì?', NULL, N'["Lô hàng", "Hết hàng", "Mua sắm", "Thời gian thực hiện"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_25 AND Prompt = N'Từ "Order fulfillment" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_25, N'Từ "Order fulfillment" có nghĩa là gì?', NULL, N'["Hoàn thành đơn hàng", "Hậu cần", "Logistics ngược", "Thông quan"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_25 AND Prompt = N'Từ "Customs clearance" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_25, N'Từ "Customs clearance" có nghĩa là gì?', NULL, N'["Thông quan", "Chuỗi lạnh", "Mua sắm", "Nhà cung cấp"]', 0);

-- Chủ đề 26: Giao tiếp (Communication) (27 từ)
DECLARE @LessonId_26 INT;
SELECT @LessonId_26 = Id FROM dbo.Lessons WHERE Title = N'Giao tiếp (Communication)' AND LanguageCode = 'en';
IF @LessonId_26 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Giao tiếp (Communication)', 'en', 'TOEIC 650', 28, 2, 3);
    SET @LessonId_26 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Communication')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Communication', N'/kəˌmjuː.nɪˈkeɪ.ʃən/', N'/kəˌmjuː.nɪˈkeɪ.ʃən/', N'noun', N'Giao tiếp, truyền thông', N'Effective communication is key to teamwork.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Conversation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Conversation', N'/ˌkɒn.vəˈseɪ.ʃən/', N'/ˌkɒn.vəˈseɪ.ʃən/', N'noun', N'Cuộc trò chuyện', N'We had a long conversation about the project.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Feedback')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Feedback', N'/ˈfiːd.bæk/', N'/ˈfiːd.bæk/', N'noun', N'Phản hồi', N'The manager gave positive feedback on the presentation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Negotiation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Negotiation', N'/nɪˌɡəʊ.ʃiˈeɪ.ʃən/', N'/nɪˌɡəʊ.ʃiˈeɪ.ʃən/', N'noun', N'Đàm phán, thương lượng', N'The salary negotiation lasted several hours.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Message')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Message', N'/ˈmes.ɪdʒ/', N'/ˈmes.ɪdʒ/', N'noun', N'Tin nhắn, thông điệp', N'Please leave a message if I’m not available.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Clarification')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Clarification', N'/ˌklær.ɪ.fɪˈkeɪ.ʃən/', N'/ˌklær.ɪ.fɪˈkeɪ.ʃən/', N'noun', N'Làm rõ, giải thích', N'Could you provide some clarification on this point?', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Tone')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Tone', N'/təʊn/', N'/təʊn/', N'noun', N'Giọng điệu', N'Her tone of voice sounded very professional.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Verbal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Verbal', N'/ˈvɜː.bəl/', N'/ˈvɜː.bəl/', N'adjective', N'Bằng lời nói', N'Clear verbal communication is essential in customer service.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Nonverbal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Nonverbal', N'/ˌnɒnˈvɜː.bəl/', N'/ˌnɒnˈvɜː.bəl/', N'adjective', N'Phi ngôn ngữ', N'Body language is an important part of nonverbal communication.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Email')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Email', N'/ˈiː.meɪl/', N'/ˈiː.meɪl/', N'noun', N'Thư điện tử', N'I sent an email to confirm our meeting time.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Phone call')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Phone call', N'/fəʊn kɔːl/', N'/fəʊn kɔːl/', N'noun', N'Cuộc gọi', N'I’ll make a quick phone call to update the client.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Meeting')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Meeting', N'/ˈmiː.tɪŋ/', N'/ˈmiː.tɪŋ/', N'noun', N'Cuộc họp', N'The team has a weekly meeting to discuss progress.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Presentation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Presentation', N'/ˌprez.ənˈteɪ.ʃən/', N'/ˌprez.ənˈteɪ.ʃən/', N'noun', N'Bài thuyết trình', N'Her presentation on the new product was impressive.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Inquiry')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Inquiry', N'/ɪnˈkwaɪə.ri/', N'/ɪnˈkwaɪə.ri/', N'noun', N'Yêu cầu thông tin', N'We received an inquiry about our services.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Discussion')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Discussion', N'/dɪˈskʌʃ.ən/', N'/dɪˈskʌʃ.ən/', N'noun', N'Thảo luận', N'The discussion focused on potential solutions to the problem.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Proposal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Proposal', N'/prəˈpəʊ.zəl/', N'/prəˈpəʊ.zəl/', N'adjective', N'Đề xuất', N'The proposal was accepted by the board of directors.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Conflict')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Conflict', N'/ˈkɒn.flɪkt/', N'/ˈkɒn.flɪkt/', N'noun', N'Xung đột, mâu thuẫn', N'Resolving workplace conflicts is a key skill for managers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Agreement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Agreement', N'/əˈɡriː.mənt/', N'/əˈɡriː.mənt/', N'noun', N'Sự đồng thuận, thỏa thuận', N'Both parties reached an agreement after the negotiation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Active listening')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Active listening', N'/ˈæk.tɪv ˈlɪs.ən.ɪŋ/', N'/ˈæk.tɪv ˈlɪs.ən.ɪŋ/', N'noun', N'Lắng nghe tích cực', N'Active listening helps build trust and understanding.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Body language')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Body language', N'/ˈbɒd.i ˌlæŋ.ɡwɪdʒ/', N'/ˈbɒd.i ˌlæŋ.ɡwɪdʒ/', N'noun', N'Ngôn ngữ cơ thể', N'Good body language can enhance your presentation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Conflict resolution')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Conflict resolution', N'/ˈkɒn.flɪkt ˌrez.əˈluː.ʃən/', N'/ˈkɒn.flɪkt ˌrez.əˈluː.ʃən/', N'noun', N'Giải quyết xung đột', N'The manager is skilled in conflict resolution.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Formal communication')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Formal communication', N'/ˈfɔː.məl ˌkɒm.jʊˈnɪk.eɪ.ʃən/', N'/ˈfɔː.məl ˌkɒm.jʊˈnɪk.eɪ.ʃən/', N'noun', N'Giao tiếp chính thức', N'Business emails are an example of formal communication.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Informal communication')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Informal communication', N'/ɪnˈfɔː.məl ˌkɒm.jʊˈnɪk.eɪ.ʃən/', N'/ɪnˈfɔː.məl ˌkɒm.jʊˈnɪk.eɪ.ʃən/', N'noun', N'Giao tiếp không chính thức', N'Office chit-chat is a form of informal communication.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Memo')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Memo', N'/ˈmem.əʊ/', N'/ˈmem.əʊ/', N'noun', N'Thông báo nội bộ', N'A memo was sent to all employees about the new policy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Announcement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Announcement', N'/əˈnaʊns.mənt/', N'/əˈnaʊns.mənt/', N'noun', N'Thông báo', N'The manager made an important announcement at the meeting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Question')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Question', N'/ˈkwes.tʃən/', N'/ˈkwes.tʃən/', N'noun', N'Câu hỏi', N'Please ask any questions at the end of the session.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_26 AND Word = N'Response')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_26, N'Response', N'/rɪˈspɒns/', N'/rɪˈspɒns/', N'noun', N'Phản hồi, câu trả lời', N'The client gave a positive response to our proposal.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_26 AND Prompt = N'Từ "Body language" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_26, N'Từ "Body language" có nghĩa là gì?', NULL, N'["Ngôn ngữ cơ thể", "Phi ngôn ngữ", "Tin nhắn, thông điệp", "Bằng lời nói"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_26 AND Prompt = N'Từ "Conflict" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_26, N'Từ "Conflict" có nghĩa là gì?', NULL, N'["Ngôn ngữ cơ thể", "Thông báo", "Xung đột, mâu thuẫn", "Phản hồi"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_26 AND Prompt = N'Từ "Proposal" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_26, N'Từ "Proposal" có nghĩa là gì?', NULL, N'["Yêu cầu thông tin", "Giao tiếp không chính thức", "Làm rõ, giải thích", "Đề xuất"]', 3);

-- Chủ đề 27: Hội nghị (Meetings) (27 từ)
DECLARE @LessonId_27 INT;
SELECT @LessonId_27 = Id FROM dbo.Lessons WHERE Title = N'Hội nghị (Meetings)' AND LanguageCode = 'en';
IF @LessonId_27 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Hội nghị (Meetings)', 'en', 'TOEIC 650', 29, 2, 3);
    SET @LessonId_27 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Meeting')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Meeting', N'/ˈmiː.tɪŋ/', N'/ˈmiː.tɪŋ/', N'noun', N'Cuộc họp', N'The meeting is scheduled for 10 AM tomorrow.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Agenda')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Agenda', N'/əˈdʒen.də/', N'/əˈdʒen.də/', N'noun', N'Chương trình họp', N'The agenda was distributed to all attendees before the meeting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Minutes')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Minutes', N'/ˈmɪn.ɪts/', N'/ˈmɪn.ɪts/', N'noun', N'Biên bản cuộc họp', N'The secretary took detailed minutes during the discussion.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Chairperson')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Chairperson', N'/ˈtʃeə.pɜː.sən/', N'/ˈtʃeə.pɜː.sən/', N'noun', N'Chủ tọa', N'The chairperson opened the meeting with a brief introduction.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Participant')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Participant', N'/pɑːˈtɪs.ɪ.pənt/', N'/pɑːˈtɪs.ɪ.pənt/', N'noun', N'Người tham dự', N'All participants are requested to arrive on time.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Presentation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Presentation', N'/ˌprez.ənˈteɪ.ʃən/', N'/ˌprez.ənˈteɪ.ʃən/', N'noun', N'Bài thuyết trình', N'The marketing team gave a presentation on the new campaign.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Discussion')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Discussion', N'/dɪˈskʌʃ.ən/', N'/dɪˈskʌʃ.ən/', N'noun', N'Thảo luận', N'The discussion focused on budget allocation for next year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Proposal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Proposal', N'/prəˈpəʊ.zəl/', N'/prəˈpəʊ.zəl/', N'adjective', N'Đề xuất', N'A new proposal was introduced to improve customer service.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Brainstorming')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Brainstorming', N'/ˈbreɪnˌstɔː.mɪŋ/', N'/ˈbreɪnˌstɔː.mɪŋ/', N'noun', N'Động não, thảo luận ý tưởng', N'The team engaged in a brainstorming session to generate ideas.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Consensus')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Consensus', N'/kənˈsen.səs/', N'/kənˈsen.səs/', N'noun', N'Đồng thuận', N'The group reached a consensus on the final decision.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Vote')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Vote', N'/vəʊt/', N'/vəʊt/', N'noun', N'Bỏ phiếu', N'A vote was conducted to decide the meeting’s outcome.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Action item')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Action item', N'/ˈæk.ʃən ˌaɪ.təm/', N'/ˈæk.ʃən ˌaɪ.təm/', N'noun', N'Nhiệm vụ cần thực hiện', N'Each team member was assigned an action item after the meeting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Follow-up')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Follow-up', N'/ˈfɒl.oʊ ˌʌp/', N'/ˈfɒl.oʊ ˌʌp/', N'noun', N'Theo dõi sau cuộc họp', N'A follow-up email summarized the key points discussed.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Conference call')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Conference call', N'/ˈkɒn.fər.əns ˌkɔːl/', N'/ˈkɒn.fər.əns ˌkɔːl/', N'noun', N'Cuộc họp qua điện thoại', N'The project update was shared during a conference call.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Reschedule')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Reschedule', N'/ˌriːˈʃed.juːl/', N'/ˌriːˈʃed.juːl/', N'noun', N'Sắp xếp lại', N'The meeting was rescheduled for next week.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Cancel')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Cancel', N'/ˈkæn.səl/', N'/ˈkæn.səl/', N'noun', N'Hủy bỏ', N'Due to unforeseen circumstances, the meeting was canceled.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Quorum')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Quorum', N'/ˈkwɔː.rəm/', N'/ˈkwɔː.rəm/', N'noun', N'Số đại biểu tối thiểu', N'A quorum is required to make any official decisions during the meeting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Venue')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Venue', N'/ˈven.juː/', N'/ˈven.juː/', N'noun', N'Địa điểm', N'The venue for the meeting is the conference room on the second floor.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Deadline')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Deadline', N'/ˈded.laɪn/', N'/ˈded.laɪn/', N'noun', N'Hạn chót', N'The deadline for submitting reports was discussed during the meeting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Keynote speaker')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Keynote speaker', N'/ˈkiː.nəʊt ˈspiː.kər/', N'/ˈkiː.nəʊt ˈspiː.kər/', N'noun', N'Diễn giả chính', N'The keynote speaker shared valuable insights during the conference.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Timekeeper')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Timekeeper', N'/ˈtaɪmˌkiː.pər/', N'/ˈtaɪmˌkiː.pər/', N'noun', N'Người quản lý thời gian', N'The timekeeper ensured that the meeting stayed on schedule.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Opening remarks')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Opening remarks', N'/ˈəʊ.pən.ɪŋ rɪˈmɑːks/', N'/ˈəʊ.pən.ɪŋ rɪˈmɑːks/', N'noun', N'Phát biểu mở đầu', N'The opening remarks set the tone for the rest of the meeting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Closing remarks')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Closing remarks', N'/ˈkləʊ.zɪŋ rɪˈmɑːks/', N'/ˈkləʊ.zɪŋ rɪˈmɑːks/', N'noun', N'Phát biểu kết thúc', N'The manager gave the closing remarks to conclude the meeting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Off-topic')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Off-topic', N'/ˌɒfˈtɒp.ɪk/', N'/ˌɒfˈtɒp.ɪk/', N'adjective', N'Lạc đề', N'The chairperson reminded participants not to go off-topic.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Adjourn')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Adjourn', N'/əˈdʒɜːn/', N'/əˈdʒɜːn/', N'noun', N'Kết thúc, tạm hoãn', N'The meeting was adjourned until further notice.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Attendance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Attendance', N'/əˈten.dəns/', N'/əˈten.dəns/', N'noun', N'Sự tham dự', N'The attendance list was circulated to record who was present.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_27 AND Word = N'Conflict resolution')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_27, N'Conflict resolution', N'/ˈkɒn.flɪkt ˌrez.əˈluː.ʃən/', N'/ˈkɒn.flɪkt ˌrez.əˈluː.ʃən/', N'noun', N'Giải quyết xung đột', N'Conflict resolution was a key topic during the meeting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_27 AND Prompt = N'Từ "Agenda" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_27, N'Từ "Agenda" có nghĩa là gì?', NULL, N'["Theo dõi sau cuộc họp", "Diễn giả chính", "Chương trình họp", "Động não, thảo luận ý tưởng"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_27 AND Prompt = N'Từ "Deadline" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_27, N'Từ "Deadline" có nghĩa là gì?', NULL, N'["Biên bản cuộc họp", "Thảo luận", "Hạn chót", "Diễn giả chính"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_27 AND Prompt = N'Từ "Attendance" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_27, N'Từ "Attendance" có nghĩa là gì?', NULL, N'["Sự tham dự", "Người quản lý thời gian", "Địa điểm", "Giải quyết xung đột"]', 0);

-- Chủ đề 28: Quản lý dự án (Project Management) (23 từ)
DECLARE @LessonId_28 INT;
SELECT @LessonId_28 = Id FROM dbo.Lessons WHERE Title = N'Quản lý dự án (Project Management)' AND LanguageCode = 'en';
IF @LessonId_28 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Quản lý dự án (Project Management)', 'en', 'TOEIC 650', 30, 2, 3);
    SET @LessonId_28 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Project management')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Project management', N'/ˈprɒdʒ.ekt ˌmæn.ɪdʒ.mənt/', N'/ˈprɒdʒ.ekt ˌmæn.ɪdʒ.mənt/', N'noun', N'Quản lý dự án', N'Project management involves planning, execution, and monitoring.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Milestone')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Milestone', N'/ˈmaɪl.stəʊn/', N'/ˈmaɪl.stəʊn/', N'noun', N'Cột mốc quan trọng', N'Completing the prototype was a major milestone for the team.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Deliverable')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Deliverable', N'/dɪˈlɪv.ər.ə.bəl/', N'/dɪˈlɪv.ər.ə.bəl/', N'adjective', N'Kết quả cần bàn giao', N'The project manager outlined the key deliverables for the first phase.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Timeline')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Timeline', N'/ˈtaɪm.laɪn/', N'/ˈtaɪm.laɪn/', N'noun', N'Dòng thời gian, tiến độ', N'The timeline for the project is very tight.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Budget')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Budget', N'/ˈbʌdʒ.ɪt/', N'/ˈbʌdʒ.ɪt/', N'noun', N'Ngân sách', N'The project must be completed within the allocated budget.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Scope')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Scope', N'/skəʊp/', N'/skəʊp/', N'noun', N'Phạm vi', N'The project scope defines the objectives and deliverables.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Stakeholder')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Stakeholder', N'/ˈsteɪkˌhəʊl.dər/', N'/ˈsteɪkˌhəʊl.dər/', N'noun', N'Bên liên quan', N'The stakeholders were informed about the project’s progress.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Risk management')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Risk management', N'/rɪsk ˈmæn.ɪdʒ.mənt/', N'/rɪsk ˈmæn.ɪdʒ.mənt/', N'noun', N'Quản lý rủi ro', N'Effective risk management prevents potential delays.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Gantt chart')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Gantt chart', N'/ɡænt tʃɑːt/', N'/ɡænt tʃɑːt/', N'noun', N'Biểu đồ Gantt', N'The Gantt chart helped visualize the project’s timeline.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Resource allocation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Resource allocation', N'/rɪˈzɔːs ˌæl.əˈkeɪ.ʃən/', N'/rɪˈzɔːs ˌæl.əˈkeɪ.ʃən/', N'noun', N'Phân bổ nguồn lực', N'Proper resource allocation ensures efficient task completion.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Task delegation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Task delegation', N'/tɑːsk ˌdel.ɪˈɡeɪ.ʃən/', N'/tɑːsk ˌdel.ɪˈɡeɪ.ʃən/', N'noun', N'Giao nhiệm vụ', N'The manager focused on effective task delegation to balance workloads.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Dependency')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Dependency', N'/dɪˈpen.dən.si/', N'/dɪˈpen.dən.si/', N'noun', N'Sự phụ thuộc', N'The team identified dependencies between project tasks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Contingency plan')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Contingency plan', N'/kənˈtɪn.dʒən.si ˌplæn/', N'/kənˈtɪn.dʒən.si ˌplæn/', N'noun', N'Kế hoạch dự phòng', N'A contingency plan is in place for unexpected issues.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Agile methodology')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Agile methodology', N'/ˈædʒ.aɪl ˌmeθ.əˈdɒl.ə.dʒi/', N'/ˈædʒ.aɪl ˌmeθ.əˈdɒl.ə.dʒi/', N'noun', N'Phương pháp Agile', N'The team adopted an Agile methodology for flexibility and collaboration.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Waterfall model')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Waterfall model', N'/ˈwɔː.tə.fɔːl ˌmɒd.əl/', N'/ˈwɔː.tə.fɔːl ˌmɒd.əl/', N'noun', N'Mô hình thác nước', N'The Waterfall model is often used for structured project management.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Critical path')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Critical path', N'/ˈkrɪt.ɪ.kəl ˌpɑːθ/', N'/ˈkrɪt.ɪ.kəl ˌpɑːθ/', N'noun', N'Đường đi quan trọng', N'Identifying the critical path is essential for managing project timelines.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Baseline')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Baseline', N'/ˈbeɪs.laɪn/', N'/ˈbeɪs.laɪn/', N'noun', N'Đường cơ sở', N'The project’s progress is measured against the original baseline.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Collaboration')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Collaboration', N'/kəˌlæb.əˈreɪ.ʃən/', N'/kəˌlæb.əˈreɪ.ʃən/', N'noun', N'Sự hợp tác', N'Team collaboration is crucial to meet deadlines.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Change management')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Change management', N'/tʃeɪndʒ ˈmæn.ɪdʒ.mənt/', N'/tʃeɪndʒ ˈmæn.ɪdʒ.mənt/', N'noun', N'Quản lý thay đổi', N'The company implemented a change management strategy for the project.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Monitoring')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Monitoring', N'/ˈmɒn.ɪ.tər.ɪŋ/', N'/ˈmɒn.ɪ.tər.ɪŋ/', N'noun', N'Giám sát', N'Regular monitoring ensures that the project stays on track.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Kickoff meeting')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Kickoff meeting', N'/ˈkɪk.ɒf ˈmiː.tɪŋ/', N'/ˈkɪk.ɒf ˈmiː.tɪŋ/', N'noun', N'Cuộc họp khởi động dự án', N'The kickoff meeting set clear expectations for all team members.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Status report')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Status report', N'/ˈsteɪ.təs rɪˈpɔːt/', N'/ˈsteɪ.təs rɪˈpɔːt/', N'noun', N'Báo cáo tiến độ', N'The team submitted a weekly status report to the project manager.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_28 AND Word = N'Closure')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_28, N'Closure', N'/ˈkləʊ.ʒər/', N'/ˈkləʊ.ʒər/', N'noun', N'Kết thúc dự án', N'The closure phase includes final reviews and documentation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_28 AND Prompt = N'Từ "Change management" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_28, N'Từ "Change management" có nghĩa là gì?', NULL, N'["Ngân sách", "Báo cáo tiến độ", "Quản lý thay đổi", "Kết quả cần bàn giao"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_28 AND Prompt = N'Từ "Risk management" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_28, N'Từ "Risk management" có nghĩa là gì?', NULL, N'["Giao nhiệm vụ", "Phương pháp Agile", "Mô hình thác nước", "Quản lý rủi ro"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_28 AND Prompt = N'Từ "Budget" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_28, N'Từ "Budget" có nghĩa là gì?', NULL, N'["Mô hình thác nước", "Ngân sách", "Bên liên quan", "Đường cơ sở"]', 1);

-- Chủ đề 29: Hành chính văn phòng (Administrative Tasks) (24 từ)
DECLARE @LessonId_29 INT;
SELECT @LessonId_29 = Id FROM dbo.Lessons WHERE Title = N'Hành chính văn phòng (Administrative Tasks)' AND LanguageCode = 'en';
IF @LessonId_29 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Hành chính văn phòng (Administrative Tasks)', 'en', 'TOEIC 650', 31, 2, 3);
    SET @LessonId_29 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Administrative tasks')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Administrative tasks', N'/ədˈmɪn.ɪ.strə.tɪv tæsks/', N'/ədˈmɪn.ɪ.strə.tɪv tæsks/', N'noun', N'Nhiệm vụ hành chính', N'She is responsible for administrative tasks such as scheduling meetings.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Schedule')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Schedule', N'/ˈʃed.juːl/ or /ˈskedʒ.uːl/', N'/ˈʃed.juːl/ or /ˈskedʒ.uːl/', N'noun', N'Lịch trình, sắp xếp', N'I need to schedule a meeting with the manager.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Filing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Filing', N'/ˈfaɪ.lɪŋ/', N'/ˈfaɪ.lɪŋ/', N'noun', N'Sắp xếp hồ sơ, tài liệu', N'The secretary spent the afternoon filing important documents.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Documentation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Documentation', N'/ˌdɒk.jə.menˈteɪ.ʃən/', N'/ˌdɒk.jə.menˈteɪ.ʃən/', N'noun', N'Tài liệu', N'Proper documentation is required for the project proposal.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Recordkeeping')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Recordkeeping', N'/ˈrek.ɔːdˌkiː.pɪŋ/', N'/ˈrek.ɔːdˌkiː.pɪŋ/', N'noun', N'Lưu trữ hồ sơ', N'Accurate recordkeeping helps in tracking employee performance.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Meeting minutes')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Meeting minutes', N'/ˈmiː.tɪŋ ˈmɪn.ɪts/', N'/ˈmiː.tɪŋ ˈmɪn.ɪts/', N'noun', N'Biên bản cuộc họp', N'The assistant took detailed meeting minutes during the session.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Correspondence')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Correspondence', N'/ˌkɒr.ɪˈspɒn.dəns/', N'/ˌkɒr.ɪˈspɒn.dəns/', N'noun', N'Thư từ, trao đổi thư tín', N'Handling correspondence is part of her daily duties.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Appointment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Appointment', N'/əˈpɔɪnt.mənt/', N'/əˈpɔɪnt.mənt/', N'noun', N'Cuộc hẹn', N'He has an appointment with the HR department this afternoon.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Data entry')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Data entry', N'/ˈdeɪ.tə ˌen.tri/', N'/ˈdeɪ.tə ˌen.tri/', N'noun', N'Nhập dữ liệu', N'The data entry task must be completed by the end of the day.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Office supplies')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Office supplies', N'/ˈɒf.ɪs səˈplaɪz/', N'/ˈɒf.ɪs səˈplaɪz/', N'noun', N'Văn phòng phẩm', N'She ordered new office supplies like pens and paper.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Receptionist')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Receptionist', N'/rɪˈsep.ʃən.ɪst/', N'/rɪˈsep.ʃən.ɪst/', N'noun', N'Lễ tân', N'The receptionist greeted all visitors warmly.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Organize')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Organize', N'/ˈɔː.ɡə.naɪz/', N'/ˈɔː.ɡə.naɪz/', N'verb', N'Sắp xếp', N'Her main duty is to organize events and meetings for the office.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Calendar management')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Calendar management', N'/ˈkæl.ən.dər ˌmæn.ɪdʒ.mənt/', N'/ˈkæl.ən.dər ˌmæn.ɪdʒ.mənt/', N'noun', N'Quản lý lịch làm việc', N'Calendar management ensures no overlapping meetings.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Mail distribution')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Mail distribution', N'/meɪl ˌdɪs.trɪˈbjuː.ʃən/', N'/meɪl ˌdɪs.trɪˈbjuː.ʃən/', N'noun', N'Phân phối thư từ', N'The receptionist handles mail distribution every morning.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Invoice processing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Invoice processing', N'/ˈɪn.vɔɪs ˌprəʊ.ses.ɪŋ/', N'/ˈɪn.vɔɪs ˌprəʊ.ses.ɪŋ/', N'noun', N'Xử lý hóa đơn', N'She is responsible for invoice processing and payments.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Travel arrangements')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Travel arrangements', N'/ˈtræv.əl əˌreɪndʒ.mənts/', N'/ˈtræv.əl əˌreɪndʒ.mənts/', N'noun', N'Sắp xếp công tác', N'The assistant made all the travel arrangements for the business trip.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Filing cabinet')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Filing cabinet', N'/ˈfaɪ.lɪŋ ˌkæb.ɪ.nət/', N'/ˈfaɪ.lɪŋ ˌkæb.ɪ.nət/', N'noun', N'Tủ hồ sơ', N'All important documents are stored in the filing cabinet.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Office protocol')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Office protocol', N'/ˈɒf.ɪs ˈprəʊ.tə.kɒl/', N'/ˈɒf.ɪs ˈprəʊ.tə.kɒl/', N'noun', N'Quy trình văn phòng', N'Following the office protocol is essential for smooth operations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Task prioritization')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Task prioritization', N'/tɑːsk praɪˌɒr.ɪˈtaɪ.zeɪ.ʃən/', N'/tɑːsk praɪˌɒr.ɪˈtaɪ.zeɪ.ʃən/', N'noun', N'Ưu tiên công việc', N'Task prioritization helps complete urgent tasks first.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Desk organization')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Desk organization', N'/desk ˌɔː.ɡə.naɪˈzeɪ.ʃən/', N'/desk ˌɔː.ɡə.naɪˈzeɪ.ʃən/', N'noun', N'Sắp xếp bàn làm việc', N'Good desk organization increases productivity.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Expense report')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Expense report', N'/ɪkˈspens rɪˈpɔːt/', N'/ɪkˈspens rɪˈpɔːt/', N'noun', N'Báo cáo chi phí', N'She submitted an expense report for the business trip.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Internal memo')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Internal memo', N'/ɪnˈtɜː.nəl ˈmem.əʊ/', N'/ɪnˈtɜː.nəl ˈmem.əʊ/', N'noun', N'Thông báo nội bộ', N'The manager sent an internal memo about the new policy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Meeting coordination')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Meeting coordination', N'/ˈmiː.tɪŋ kəʊˌɔː.dɪˈneɪ.ʃən/', N'/ˈmiː.tɪŋ kəʊˌɔː.dɪˈneɪ.ʃən/', N'noun', N'Điều phối cuộc họp', N'The assistant handles all meeting coordination tasks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_29 AND Word = N'Visitor management')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_29, N'Visitor management', N'/ˈvɪz.ɪ.tər ˌmæn.ɪdʒ.mənt/', N'/ˈvɪz.ɪ.tər ˌmæn.ɪdʒ.mənt/', N'noun', N'Quản lý khách đến', N'The receptionist is in charge of visitor management at the office.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_29 AND Prompt = N'Từ "Office protocol" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_29, N'Từ "Office protocol" có nghĩa là gì?', NULL, N'["Tủ hồ sơ", "Sắp xếp", "Nhiệm vụ hành chính", "Quy trình văn phòng"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_29 AND Prompt = N'Từ "Recordkeeping" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_29, N'Từ "Recordkeeping" có nghĩa là gì?', NULL, N'["Biên bản cuộc họp", "Lưu trữ hồ sơ", "Cuộc hẹn", "Phân phối thư từ"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_29 AND Prompt = N'Từ "Documentation" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_29, N'Từ "Documentation" có nghĩa là gì?', NULL, N'["Nhiệm vụ hành chính", "Tài liệu", "Lịch trình, sắp xếp", "Sắp xếp bàn làm việc"]', 1);

-- Chủ đề 30: Thể thao (Sports) (27 từ)
DECLARE @LessonId_30 INT;
SELECT @LessonId_30 = Id FROM dbo.Lessons WHERE Title = N'Thể thao (Sports)' AND LanguageCode = 'en';
IF @LessonId_30 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Thể thao (Sports)', 'en', 'TOEIC 650', 32, 2, 3);
    SET @LessonId_30 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Sport')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Sport', N'/spɔːt/', N'/spɔːt/', N'noun', N'Thể thao', N'Soccer is the most popular sport in many countries.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Athlete')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Athlete', N'/ˈæθ.liːt/', N'/ˈæθ.liːt/', N'noun', N'Vận động viên', N'The athlete trained hard for the Olympics.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Coach')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Coach', N'/kəʊtʃ/', N'/kəʊtʃ/', N'noun', N'Huấn luyện viên', N'The team’s coach devised a new training strategy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Referee')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Referee', N'/ˌref.əˈriː/', N'/ˌref.əˈriː/', N'noun', N'Trọng tài', N'The referee made a controversial decision during the match.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Spectator')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Spectator', N'/spekˈteɪ.tər/', N'/spekˈteɪ.tər/', N'noun', N'Khán giả', N'Thousands of spectators gathered to watch the final game.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Team')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Team', N'/tiːm/', N'/tiːm/', N'noun', N'Đội', N'The basketball team won their championship game.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Match')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Match', N'/mætʃ/', N'/mætʃ/', N'noun', N'Trận đấu', N'The match between the two top teams was exciting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Championship')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Championship', N'/ˈtʃæm.pi.ən.ʃɪp/', N'/ˈtʃæm.pi.ən.ʃɪp/', N'noun', N'Giải vô địch', N'He won the national championship last year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Tournament')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Tournament', N'/ˈtʊə.nə.mənt/', N'/ˈtʊə.nə.mənt/', N'noun', N'Giải đấu', N'The tennis tournament attracted players from all over the world.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Competition')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Competition', N'/ˌkɒm.pɪˈtɪʃ.ən/', N'/ˌkɒm.pɪˈtɪʃ.ən/', N'noun', N'Cuộc thi đấu', N'She is preparing for an international competition.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Medal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Medal', N'/ˈmed.əl/', N'/ˈmed.əl/', N'adjective', N'Huy chương', N'The athlete was awarded a gold medal for her performance.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Score')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Score', N'/skɔːr/', N'/skɔːr/', N'noun', N'Tỷ số', N'The final score was 3-1 in favor of the home team.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Goal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Goal', N'/ɡəʊl/', N'/ɡəʊl/', N'adjective', N'Bàn thắng, mục tiêu', N'He scored the winning goal in the last minute.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Field')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Field', N'/fiːld/', N'/fiːld/', N'noun', N'Sân thi đấu', N'The players entered the field to warm up.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Court')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Court', N'/kɔːt/', N'/kɔːt/', N'noun', N'Sân chơi (tennis, bóng rổ)', N'The tennis court is made of clay.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Stadium')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Stadium', N'/ˈsteɪ.di.əm/', N'/ˈsteɪ.di.əm/', N'noun', N'Sân vận động', N'The stadium was packed with enthusiastic fans.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Exercise')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Exercise', N'/ˈek.sə.saɪz/', N'/ˈek.sə.saɪz/', N'verb', N'Tập thể dục', N'Regular exercise is important for staying healthy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Training')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Training', N'/ˈtreɪ.nɪŋ/', N'/ˈtreɪ.nɪŋ/', N'noun', N'Luyện tập', N'The team has daily training sessions.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Fitness')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Fitness', N'/ˈfɪt.nəs/', N'/ˈfɪt.nəs/', N'noun', N'Thể hình, sức khỏe', N'Maintaining fitness is essential for athletes.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Equipment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Equipment', N'/ɪˈkwɪp.mənt/', N'/ɪˈkwɪp.mənt/', N'noun', N'Dụng cụ, thiết bị', N'The gym has state-of-the-art equipment for weightlifting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'League')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'League', N'/liːɡ/', N'/liːɡ/', N'noun', N'Giải đấu', N'Their team plays in the Premier League.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Warm-up')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Warm-up', N'/ˈwɔːm.ʌp/', N'/ˈwɔːm.ʌp/', N'noun', N'Khởi động', N'A proper warm-up prevents injuries during the game.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Sportsmanship')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Sportsmanship', N'/ˈspɔːts.mən.ʃɪp/', N'/ˈspɔːts.mən.ʃɪp/', N'noun', N'Tinh thần thể thao', N'He was praised for his sportsmanship despite losing the match.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Physical activity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Physical activity', N'/ˈfɪz.ɪ.kəl ækˈtɪv.ɪ.ti/', N'/ˈfɪz.ɪ.kəl ækˈtɪv.ɪ.ti/', N'noun', N'Hoạt động thể chất', N'Physical activity helps improve mental health.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Endurance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Endurance', N'/ɪnˈdjʊə.rəns/', N'/ɪnˈdjʊə.rəns/', N'noun', N'Sức bền', N'Long-distance running requires great endurance.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Tactic')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Tactic', N'/ˈtæk.tɪk/', N'/ˈtæk.tɪk/', N'adjective', N'Chiến thuật', N'The team discussed their tactics during the halftime break.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_30 AND Word = N'Victory')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_30, N'Victory', N'/ˈvɪk.tər.i/', N'/ˈvɪk.tər.i/', N'noun', N'Chiến thắng', N'The team celebrated their hard-fought victory.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_30 AND Prompt = N'Từ "Coach" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_30, N'Từ "Coach" có nghĩa là gì?', NULL, N'["Khán giả", "Tập thể dục", "Huấn luyện viên", "Sân chơi (tennis, bóng rổ)"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_30 AND Prompt = N'Từ "Spectator" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_30, N'Từ "Spectator" có nghĩa là gì?', NULL, N'["Khán giả", "Dụng cụ, thiết bị", "Tỷ số", "Giải vô địch"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_30 AND Prompt = N'Từ "Medal" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_30, N'Từ "Medal" có nghĩa là gì?', NULL, N'["Huy chương", "Thể thao", "Đội", "Giải đấu"]', 0);

-- Chủ đề 31: Giải trí (Entertainment) (28 từ)
DECLARE @LessonId_31 INT;
SELECT @LessonId_31 = Id FROM dbo.Lessons WHERE Title = N'Giải trí (Entertainment)' AND LanguageCode = 'en';
IF @LessonId_31 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Giải trí (Entertainment)', 'en', 'TOEIC 650', 33, 3, 3);
    SET @LessonId_31 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Entertainment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Entertainment', N'/ˌen.təˈteɪn.mənt/', N'/ˌen.təˈteɪn.mənt/', N'noun', N'Giải trí', N'The resort offers a variety of entertainment options for guests.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Movie')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Movie', N'/ˈmuː.vi/', N'/ˈmuː.vi/', N'noun', N'Phim', N'We watched a great movie at the theater last night.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Theater')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Theater', N'/ˈθɪə.tər/', N'/ˈθɪə.tər/', N'noun', N'Rạp hát, nhà hát', N'The theater was packed for the opening night of the play.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Concert')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Concert', N'/ˈkɒn.sɜːt/', N'/ˈkɒn.sɜːt/', N'noun', N'Buổi hòa nhạc', N'The band is performing a live concert this weekend.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Festival')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Festival', N'/ˈfes.tɪ.vəl/', N'/ˈfes.tɪ.vəl/', N'adjective', N'Lễ hội', N'The music festival attracts thousands of visitors every year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Exhibition')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Exhibition', N'/ˌek.sɪˈbɪʃ.ən/', N'/ˌek.sɪˈbɪʃ.ən/', N'noun', N'Triển lãm', N'The art exhibition features works by famous painters.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Show')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Show', N'/ʃəʊ/', N'/ʃəʊ/', N'noun', N'Buổi diễn', N'The magic show was a big hit with the audience.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Performance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Performance', N'/pəˈfɔː.məns/', N'/pəˈfɔː.məns/', N'noun', N'Buổi biểu diễn', N'Her performance in the play received critical acclaim.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Audience')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Audience', N'/ˈɔː.di.əns/', N'/ˈɔː.di.əns/', N'noun', N'Khán giả', N'The audience gave a standing ovation at the end of the play.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Celebrity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Celebrity', N'/səˈleb.rə.ti/', N'/səˈleb.rə.ti/', N'noun', N'Người nổi tiếng', N'The event was attended by several famous celebrities.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Actor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Actor', N'/ˈæk.tər/', N'/ˈæk.tər/', N'noun', N'Diễn viên nam', N'The actor delivered an outstanding performance in the movie.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Actress')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Actress', N'/ˈæk.trəs/', N'/ˈæk.trəs/', N'noun', N'Diễn viên nữ', N'The actress won an award for her leading role in the drama.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Director')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Director', N'/dəˈrek.tər/', N'/dəˈrek.tər/', N'noun', N'Đạo diễn', N'The director is known for creating blockbuster movies.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Ticket')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Ticket', N'/ˈtɪk.ɪt/', N'/ˈtɪk.ɪt/', N'noun', N'Vé', N'You can purchase tickets online for the concert.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Box office')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Box office', N'/ˈbɒks ˌɒf.ɪs/', N'/ˈbɒks ˌɒf.ɪs/', N'noun', N'Quầy vé', N'The box office was crowded with people buying last-minute tickets.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Comedy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Comedy', N'/ˈkɒm.ə.di/', N'/ˈkɒm.ə.di/', N'noun', N'Hài kịch', N'The stand-up comedy show had everyone laughing.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Drama')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Drama', N'/ˈdrɑː.mə/', N'/ˈdrɑː.mə/', N'noun', N'Kịch, phim truyền hình', N'The TV drama has gained a large following.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Animation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Animation', N'/ˌæn.ɪˈmeɪ.ʃən/', N'/ˌæn.ɪˈmeɪ.ʃən/', N'noun', N'Hoạt hình', N'Pixar is famous for producing amazing animations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Documentary')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Documentary', N'/ˌdɒk.jəˈmen.tər.i/', N'/ˌdɒk.jəˈmen.tər.i/', N'noun', N'Phim tài liệu', N'The documentary explored the effects of climate change.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Musician')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Musician', N'/mjuːˈzɪʃ.ən/', N'/mjuːˈzɪʃ.ən/', N'noun', N'Nhạc sĩ', N'The musician played the piano beautifully.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Orchestra')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Orchestra', N'/ˈɔː.kɪ.strə/', N'/ˈɔː.kɪ.strə/', N'noun', N'Dàn nhạc', N'The orchestra performed a symphony by Beethoven.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Entertainment industry')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Entertainment industry', N'/ˌen.təˈteɪn.mənt ˈɪn.də.stri/', N'/ˌen.təˈteɪn.mənt ˈɪn.də.stri/', N'noun', N'Ngành công nghiệp giải trí', N'The entertainment industry generates billions of dollars each year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Nightclub')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Nightclub', N'/ˈnaɪt.klʌb/', N'/ˈnaɪt.klʌb/', N'noun', N'Hộp đêm', N'The nightclub is popular among young people.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Amusement park')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Amusement park', N'/əˈmjuːz.mənt ˌpɑːk/', N'/əˈmjuːz.mənt ˌpɑːk/', N'noun', N'Công viên giải trí', N'The kids enjoyed the rides at the amusement park.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Streaming service')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Streaming service', N'/ˈstriː.mɪŋ ˌsɜː.vɪs/', N'/ˈstriː.mɪŋ ˌsɜː.vɪs/', N'noun', N'Dịch vụ phát trực tuyến', N'Netflix is one of the leading streaming services for movies and shows.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Game show')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Game show', N'/ˈɡeɪm ˌʃəʊ/', N'/ˈɡeɪm ˌʃəʊ/', N'noun', N'Chương trình trò chơi', N'She won a cash prize on a popular game show.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Fan')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Fan', N'/fæn/', N'/fæn/', N'noun', N'Người hâm mộ', N'The singer’s loyal fans waited hours to see him perform.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_31 AND Word = N'Host')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_31, N'Host', N'/həʊst/', N'/həʊst/', N'noun', N'Người dẫn chương trình', N'The host welcomed the audience warmly at the beginning of the show.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_31 AND Prompt = N'Từ "Fan" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_31, N'Từ "Fan" có nghĩa là gì?', NULL, N'["Phim tài liệu", "Người hâm mộ", "Kịch, phim truyền hình", "Quầy vé"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_31 AND Prompt = N'Từ "Comedy" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_31, N'Từ "Comedy" có nghĩa là gì?', NULL, N'["Hộp đêm", "Hài kịch", "Chương trình trò chơi", "Buổi hòa nhạc"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_31 AND Prompt = N'Từ "Concert" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_31, N'Từ "Concert" có nghĩa là gì?', NULL, N'["Buổi biểu diễn", "Buổi hòa nhạc", "Người hâm mộ", "Hoạt hình"]', 1);

-- Chủ đề 32: Nghệ thuật (Arts) (28 từ)
DECLARE @LessonId_32 INT;
SELECT @LessonId_32 = Id FROM dbo.Lessons WHERE Title = N'Nghệ thuật (Arts)' AND LanguageCode = 'en';
IF @LessonId_32 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Nghệ thuật (Arts)', 'en', 'TOEIC 650', 34, 3, 3);
    SET @LessonId_32 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Art')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Art', N'/ɑːt/', N'/ɑːt/', N'noun', N'Nghệ thuật', N'She has a passion for art and loves painting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Artist')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Artist', N'/ˈɑː.tɪst/', N'/ˈɑː.tɪst/', N'noun', N'Nghệ sĩ', N'The artist displayed her work at the gallery.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Painting')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Painting', N'/ˈpeɪn.tɪŋ/', N'/ˈpeɪn.tɪŋ/', N'noun', N'Bức tranh', N'The painting by Van Gogh is worth millions.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Sculpture')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Sculpture', N'/ˈskʌlp.tʃər/', N'/ˈskʌlp.tʃər/', N'noun', N'Điêu khắc', N'The museum features sculptures from ancient Greece.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Exhibition')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Exhibition', N'/ˌek.sɪˈbɪʃ.ən/', N'/ˌek.sɪˈbɪʃ.ən/', N'noun', N'Triển lãm', N'The art exhibition will run until the end of the month.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Canvas')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Canvas', N'/ˈkæn.vəs/', N'/ˈkæn.vəs/', N'noun', N'Vải bạt, tranh sơn dầu', N'He painted a beautiful landscape on the canvas.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Portrait')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Portrait', N'/ˈpɔː.trət/', N'/ˈpɔː.trət/', N'noun', N'Chân dung', N'The portrait of the queen was painted in 1805.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Abstract')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Abstract', N'/ˈæb.strækt/', N'/ˈæb.strækt/', N'noun', N'Trừu tượng', N'His work is famous for its abstract style.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Mural')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Mural', N'/ˈmjʊə.rəl/', N'/ˈmjʊə.rəl/', N'adjective', N'Tranh tường', N'The community painted a large mural on the side of the building.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Gallery')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Gallery', N'/ˈɡæl.ər.i/', N'/ˈɡæl.ər.i/', N'noun', N'Phòng trưng bày', N'The gallery features works by both local and international artists.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Calligraphy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Calligraphy', N'/kəˈlɪɡ.rə.fi/', N'/kəˈlɪɡ.rə.fi/', N'noun', N'Thư pháp', N'She specializes in traditional calligraphy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Masterpiece')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Masterpiece', N'/ˈmɑː.stə.piːs/', N'/ˈmɑː.stə.piːs/', N'noun', N'Kiệt tác', N'The Mona Lisa is considered a masterpiece of art.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Fresco')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Fresco', N'/ˈfres.kəʊ/', N'/ˈfres.kəʊ/', N'noun', N'Tranh tường (vẽ trên thạch cao ướt)', N'The ancient frescoes depict scenes from daily life.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Contemporary')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Contemporary', N'/kənˈtem.pər.ər.i/', N'/kənˈtem.pər.ər.i/', N'noun', N'Đương đại', N'The museum showcases contemporary art by young artists.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Aesthetic')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Aesthetic', N'/iːsˈθet.ɪk/', N'/iːsˈθet.ɪk/', N'adjective', N'Thẩm mỹ', N'The design is both functional and aesthetic.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Carving')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Carving', N'/ˈkɑː.vɪŋ/', N'/ˈkɑː.vɪŋ/', N'noun', N'Chạm khắc', N'The wood carving was intricately detailed.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Museum')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Museum', N'/mjuːˈziː.əm/', N'/mjuːˈziː.əm/', N'noun', N'Bảo tàng', N'The museum has a vast collection of Renaissance art.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Craft')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Craft', N'/krɑːft/', N'/krɑːft/', N'noun', N'Thủ công', N'Traditional crafts are often displayed at cultural fairs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Pottery')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Pottery', N'/ˈpɒt.ər.i/', N'/ˈpɒt.ər.i/', N'noun', N'Gốm sứ', N'She took a class to learn how to make pottery.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Drawing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Drawing', N'/ˈdrɔː.ɪŋ/', N'/ˈdrɔː.ɪŋ/', N'noun', N'Bản vẽ, tranh vẽ tay', N'The architect presented a detailed drawing of the building.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Engraving')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Engraving', N'/ɪnˈɡreɪ.vɪŋ/', N'/ɪnˈɡreɪ.vɪŋ/', N'noun', N'Khắc, chạm', N'The engraving on the trophy was beautifully done.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Installation art')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Installation art', N'/ˌɪn.stəˈleɪ.ʃən ˌɑːt/', N'/ˌɪn.stəˈleɪ.ʃən ˌɑːt/', N'noun', N'Nghệ thuật sắp đặt', N'The installation art in the gallery was both interactive and engaging.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Medium')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Medium', N'/ˈmiː.di.əm/', N'/ˈmiː.di.əm/', N'noun', N'Phương tiện, chất liệu', N'Oil paint is a popular medium for artists.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Inspiration')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Inspiration', N'/ˌɪn.spɪˈreɪ.ʃən/', N'/ˌɪn.spɪˈreɪ.ʃən/', N'noun', N'Cảm hứng', N'The natural landscape served as inspiration for her artwork.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Art critic')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Art critic', N'/ɑːt ˈkrɪt.ɪk/', N'/ɑːt ˈkrɪt.ɪk/', N'adjective', N'Nhà phê bình nghệ thuật', N'The art critic gave a glowing review of the new exhibition.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Palette')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Palette', N'/ˈpæl.ət/', N'/ˈpæl.ət/', N'noun', N'Bảng màu', N'The artist mixed colors on the palette to create unique shades.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Fine art')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Fine art', N'/ˌfaɪn ˈɑːt/', N'/ˌfaɪn ˈɑːt/', N'noun', N'Nghệ thuật tinh tế', N'The museum is dedicated to preserving fine art from around the world.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_32 AND Word = N'Performing arts')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_32, N'Performing arts', N'/pəˈfɔː.mɪŋ ɑːts/', N'/pəˈfɔː.mɪŋ ɑːts/', N'noun', N'Nghệ thuật biểu diễn', N'She studied performing arts at a prestigious academy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_32 AND Prompt = N'Từ "Contemporary" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_32, N'Từ "Contemporary" có nghĩa là gì?', NULL, N'["Bản vẽ, tranh vẽ tay", "Đương đại", "Triển lãm", "Trừu tượng"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_32 AND Prompt = N'Từ "Carving" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_32, N'Từ "Carving" có nghĩa là gì?', NULL, N'["Bản vẽ, tranh vẽ tay", "Cảm hứng", "Chạm khắc", "Nghệ thuật tinh tế"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_32 AND Prompt = N'Từ "Fresco" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_32, N'Từ "Fresco" có nghĩa là gì?', NULL, N'["Tranh tường (vẽ trên thạch cao ướt)", "Thư pháp", "Thẩm mỹ", "Nhà phê bình nghệ thuật"]', 0);

-- Chủ đề 33: Thời trang (Fashion) (30 từ)
DECLARE @LessonId_33 INT;
SELECT @LessonId_33 = Id FROM dbo.Lessons WHERE Title = N'Thời trang (Fashion)' AND LanguageCode = 'en';
IF @LessonId_33 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Thời trang (Fashion)', 'en', 'TOEIC 650', 35, 3, 3);
    SET @LessonId_33 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Fashion')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Fashion', N'/ˈfæʃ.ən/', N'/ˈfæʃ.ən/', N'noun', N'Thời trang', N'The event showcases the latest trends in fashion.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Designer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Designer', N'/dɪˈzaɪ.nər/', N'/dɪˈzaɪ.nər/', N'noun', N'Nhà thiết kế', N'She is a renowned fashion designer.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Brand')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Brand', N'/brænd/', N'/brænd/', N'noun', N'Thương hiệu', N'This luxury brand is famous for its handbags.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Trend')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Trend', N'/trend/', N'/trend/', N'noun', N'Xu hướng', N'The latest trend is oversized clothing.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Outfit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Outfit', N'/ˈaʊt.fɪt/', N'/ˈaʊt.fɪt/', N'noun', N'Trang phục', N'She wore a stunning outfit to the party.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Style')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Style', N'/staɪl/', N'/staɪl/', N'noun', N'Phong cách', N'Her style is simple yet elegant.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Wardrobe')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Wardrobe', N'/ˈwɔː.drəʊb/', N'/ˈwɔː.drəʊb/', N'noun', N'Tủ quần áo, trang phục', N'She added a few new pieces to her wardrobe.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Accessory')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Accessory', N'/əkˈses.ər.i/', N'/əkˈses.ər.i/', N'noun', N'Phụ kiện', N'Earrings and necklaces are common accessories.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Couture')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Couture', N'/kuːˈtjʊər/', N'/kuːˈtjʊər/', N'noun', N'Thời trang cao cấp', N'The dress is part of the brand’s couture collection.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Fabric')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Fabric', N'/ˈfæb.rɪk/', N'/ˈfæb.rɪk/', N'adjective', N'Vải', N'The dress is made of high-quality fabric.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Tailor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Tailor', N'/ˈteɪ.lər/', N'/ˈteɪ.lər/', N'noun', N'Thợ may', N'She took the suit to a tailor for adjustments.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Runway')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Runway', N'/ˈrʌn.weɪ/', N'/ˈrʌn.weɪ/', N'noun', N'Sàn diễn thời trang', N'The model walked confidently down the runway.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Model')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Model', N'/ˈmɒd.əl/', N'/ˈmɒd.əl/', N'noun', N'Người mẫu', N'He works as a fashion model in Paris.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Boutique')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Boutique', N'/buːˈtiːk/', N'/buːˈtiːk/', N'noun', N'Cửa hàng thời trang nhỏ', N'The boutique offers exclusive designer pieces.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Designer label')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Designer label', N'/dɪˈzaɪ.nər ˈleɪ.bəl/', N'/dɪˈzaɪ.nər ˈleɪ.bəl/', N'noun', N'Nhãn hiệu thiết kế cao cấp', N'She loves wearing clothes from famous designer labels.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Garment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Garment', N'/ˈɡɑː.mənt/', N'/ˈɡɑː.mənt/', N'noun', N'Trang phục, quần áo', N'The company manufactures high-quality garments.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Trendy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Trendy', N'/ˈtren.di/', N'/ˈtren.di/', N'noun', N'Hợp thời, sành điệu', N'This shop is popular among trendy young people.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Vintage')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Vintage', N'/ˈvɪn.tɪdʒ/', N'/ˈvɪn.tɪdʒ/', N'noun', N'Cổ điển', N'She prefers wearing vintage dresses from the 1960s.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Casual')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Casual', N'/ˈkæʒ.u.əl/', N'/ˈkæʒ.u.əl/', N'adjective', N'Trang phục thường ngày', N'The dress code for the event is casual.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Formal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Formal', N'/ˈfɔː.məl/', N'/ˈfɔː.məl/', N'adjective', N'Trang phục trang trọng', N'A suit and tie are considered formal attire.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Fitting room')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Fitting room', N'/ˈfɪt.ɪŋ ˌruːm/', N'/ˈfɪt.ɪŋ ˌruːm/', N'noun', N'Phòng thử đồ', N'She went to the fitting room to try on the dress.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Pattern')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Pattern', N'/ˈpæt.ən/', N'/ˈpæt.ən/', N'noun', N'Hoa văn, họa tiết', N'The blouse has a beautiful floral pattern.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Seasonal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Seasonal', N'/ˈsiː.zən.əl/', N'/ˈsiː.zən.əl/', N'adjective', N'Theo mùa', N'This store updates its collection with seasonal trends.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Embroidery')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Embroidery', N'/ɪmˈbrɔɪ.dər.i/', N'/ɪmˈbrɔɪ.dər.i/', N'noun', N'Thêu', N'The dress features intricate embroidery on the neckline.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Hem')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Hem', N'/hem/', N'/hem/', N'noun', N'Gấu quần/áo', N'The hem of the dress was shortened to fit her height.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Knitwear')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Knitwear', N'/ˈnɪt.weər/', N'/ˈnɪt.weər/', N'noun', N'Đồ dệt kim', N'She bought a cozy sweater from the knitwear section.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Fast fashion')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Fast fashion', N'/fɑːst ˈfæʃ.ən/', N'/fɑːst ˈfæʃ.ən/', N'noun', N'Thời trang nhanh', N'Many people are moving away from fast fashion for sustainability.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'High heels')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'High heels', N'/ˌhaɪ ˈhiːlz/', N'/ˌhaɪ ˈhiːlz/', N'noun', N'Giày cao gót', N'She wore elegant high heels to the gala.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Accessories')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Accessories', N'/əkˈses.ər.iz/', N'/əkˈses.ər.iz/', N'noun', N'Phụ kiện', N'The shop offers a wide range of accessories to complement any outfit.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_33 AND Word = N'Silk')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_33, N'Silk', N'/sɪlk/', N'/sɪlk/', N'noun', N'Lụa', N'This blouse is made of pure silk.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_33 AND Prompt = N'Từ "High heels" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_33, N'Từ "High heels" có nghĩa là gì?', NULL, N'["Thợ may", "Giày cao gót", "Nhà thiết kế", "Trang phục trang trọng"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_33 AND Prompt = N'Từ "Casual" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_33, N'Từ "Casual" có nghĩa là gì?', NULL, N'["Xu hướng", "Trang phục, quần áo", "Hoa văn, họa tiết", "Trang phục thường ngày"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_33 AND Prompt = N'Từ "Style" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_33, N'Từ "Style" có nghĩa là gì?', NULL, N'["Thời trang", "Cổ điển", "Phong cách", "Người mẫu"]', 2);

-- Chủ đề 34: Sự kiện (Events) (26 từ)
DECLARE @LessonId_34 INT;
SELECT @LessonId_34 = Id FROM dbo.Lessons WHERE Title = N'Sự kiện (Events)' AND LanguageCode = 'en';
IF @LessonId_34 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Sự kiện (Events)', 'en', 'TOEIC 650', 36, 3, 3);
    SET @LessonId_34 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Event')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Event', N'/ɪˈvent/', N'/ɪˈvent/', N'noun', N'Sự kiện', N'The company is hosting a major event to launch its new product.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Organizer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Organizer', N'/ˈɔː.ɡən.aɪ.zər/', N'/ˈɔː.ɡən.aɪ.zər/', N'noun', N'Người tổ chức', N'The organizer is responsible for coordinating all aspects of the event.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Venue')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Venue', N'/ˈven.juː/', N'/ˈven.juː/', N'noun', N'Địa điểm tổ chức', N'The venue for the conference is the Grand Hotel.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Guest list')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Guest list', N'/ɡest lɪst/', N'/ɡest lɪst/', N'noun', N'Danh sách khách mời', N'The guest list includes several high-profile individuals.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Invitation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Invitation', N'/ˌɪn.vɪˈteɪ.ʃən/', N'/ˌɪn.vɪˈteɪ.ʃən/', N'noun', N'Lời mời', N'She sent out invitations for the charity dinner.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Attendee')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Attendee', N'/əˈten.diː/', N'/əˈten.diː/', N'noun', N'Người tham dự', N'The event had over 200 attendees from different industries.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Agenda')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Agenda', N'/əˈdʒen.də/', N'/əˈdʒen.də/', N'noun', N'Chương trình nghị sự', N'The meeting agenda was shared in advance.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Conference')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Conference', N'/ˈkɒn.fər.əns/', N'/ˈkɒn.fər.əns/', N'noun', N'Hội nghị', N'The annual conference will focus on technology trends.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Seminar')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Seminar', N'/ˈsem.ɪ.nɑːr/', N'/ˈsem.ɪ.nɑːr/', N'noun', N'Hội thảo', N'A professional seminar on marketing strategies was held yesterday.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Workshop')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Workshop', N'/ˈwɜːk.ʃɒp/', N'/ˈwɜːk.ʃɒp/', N'noun', N'Buổi hội thảo thực hành', N'The workshop provided hands-on training in graphic design.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Exhibit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Exhibit', N'/ɪɡˈzɪb.ɪt/', N'/ɪɡˈzɪb.ɪt/', N'noun', N'Triển lãm', N'The art exhibit features works by local artists.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Reception')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Reception', N'/rɪˈsep.ʃən/', N'/rɪˈsep.ʃən/', N'noun', N'Tiệc đón tiếp', N'A welcome reception was held for the conference participants.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Catering')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Catering', N'/ˈkeɪ.tər.ɪŋ/', N'/ˈkeɪ.tər.ɪŋ/', N'noun', N'Dịch vụ ăn uống', N'The catering service provided excellent food for the event.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Keynote speaker')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Keynote speaker', N'/ˈkiː.nəʊt ˈspiː.kər/', N'/ˈkiː.nəʊt ˈspiː.kər/', N'noun', N'Diễn giả chính', N'The keynote speaker inspired the audience with her insights.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Sponsor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Sponsor', N'/ˈspɒn.sər/', N'/ˈspɒn.sər/', N'noun', N'Nhà tài trợ', N'The event was made possible by the generous support of our sponsors.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Program')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Program', N'/ˈprəʊ.ɡræm/', N'/ˈprəʊ.ɡræm/', N'noun', N'Chương trình', N'The event program includes speeches, workshops, and networking sessions.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Schedule')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Schedule', N'/ˈʃed.juːl/ or /ˈskedʒ.uːl/', N'/ˈʃed.juːl/ or /ˈskedʒ.uːl/', N'noun', N'Lịch trình', N'The schedule was packed with interesting activities.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'RSVP')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'RSVP', N'/ˌɑːr.es.viːˈpiː/', N'/ˌɑːr.es.viːˈpiː/', N'noun', N'Phản hồi tham dự', N'Please RSVP by the end of the week to confirm your attendance.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Gala')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Gala', N'/ˈɡɑː.lə/', N'/ˈɡɑː.lə/', N'noun', N'Buổi tiệc lớn', N'The fundraising gala attracted many celebrities and business leaders.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Opening remarks')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Opening remarks', N'/ˈəʊ.pən.ɪŋ rɪˈmɑːks/', N'/ˈəʊ.pən.ɪŋ rɪˈmɑːks/', N'noun', N'Phát biểu khai mạc', N'The CEO gave the opening remarks to kick off the event.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Closing remarks')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Closing remarks', N'/ˈkləʊ.zɪŋ rɪˈmɑːks/', N'/ˈkləʊ.zɪŋ rɪˈmɑːks/', N'noun', N'Phát biểu bế mạc', N'The organizer delivered the closing remarks at the end of the conference.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Logistics')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Logistics', N'/ləˈdʒɪs.tɪks/', N'/ləˈdʒɪs.tɪks/', N'noun', N'Hậu cần', N'The logistics team ensured everything ran smoothly during the event.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Networking')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Networking', N'/ˈnet.wɜː.kɪŋ/', N'/ˈnet.wɜː.kɪŋ/', N'noun', N'Giao lưu, kết nối', N'The conference provided excellent networking opportunities.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Stage setup')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Stage setup', N'/steɪdʒ ˈset.ʌp/', N'/steɪdʒ ˈset.ʌp/', N'noun', N'Dàn dựng sân khấu', N'The stage setup was completed an hour before the event started.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Registration desk')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Registration desk', N'/ˌredʒ.ɪˈstreɪ.ʃən desk/', N'/ˌredʒ.ɪˈstreɪ.ʃən desk/', N'noun', N'Bàn đăng ký', N'Please check in at the registration desk when you arrive.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_34 AND Word = N'Event coordinator')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_34, N'Event coordinator', N'/ɪˈvent kəʊˈɔː.dɪ.neɪ.tər/', N'/ɪˈvent kəʊˈɔː.dɪ.neɪ.tər/', N'noun', N'Điều phối sự kiện', N'The event coordinator ensured everything went according to plan.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_34 AND Prompt = N'Từ "Schedule" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_34, N'Từ "Schedule" có nghĩa là gì?', NULL, N'["Hội thảo", "Người tham dự", "Lịch trình", "Dàn dựng sân khấu"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_34 AND Prompt = N'Từ "Closing remarks" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_34, N'Từ "Closing remarks" có nghĩa là gì?', NULL, N'["Giao lưu, kết nối", "Phát biểu bế mạc", "Dịch vụ ăn uống", "Điều phối sự kiện"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_34 AND Prompt = N'Từ "Attendee" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_34, N'Từ "Attendee" có nghĩa là gì?', NULL, N'["Phát biểu bế mạc", "Diễn giả chính", "Người tham dự", "Chương trình nghị sự"]', 2);

-- Chủ đề 35: Phương tiện truyền thông (Media) (28 từ)
DECLARE @LessonId_35 INT;
SELECT @LessonId_35 = Id FROM dbo.Lessons WHERE Title = N'Phương tiện truyền thông (Media)' AND LanguageCode = 'en';
IF @LessonId_35 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Phương tiện truyền thông (Media)', 'en', 'TOEIC 650', 37, 3, 3);
    SET @LessonId_35 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Media')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Media', N'/ˈmiː.di.ə/', N'/ˈmiː.di.ə/', N'noun', N'Truyền thông', N'Social media has become a powerful marketing tool.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Journalist')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Journalist', N'/ˈdʒɜː.nə.lɪst/', N'/ˈdʒɜː.nə.lɪst/', N'noun', N'Nhà báo', N'The journalist interviewed the CEO about the new product launch.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Broadcast')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Broadcast', N'/ˈbrɔːd.kɑːst/', N'/ˈbrɔːd.kɑːst/', N'noun', N'Phát sóng', N'The news was broadcast live on television.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Press')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Press', N'/pres/', N'/pres/', N'noun', N'Báo chí', N'The press was invited to cover the product launch.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Advertisement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Advertisement', N'/ədˈvɜː.tɪs.mənt/', N'/ədˈvɜː.tɪs.mənt/', N'noun', N'Quảng cáo', N'The company created an engaging advertisement for their campaign.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Social media')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Social media', N'/ˌsəʊ.ʃəl ˈmiː.di.ə/', N'/ˌsəʊ.ʃəl ˈmiː.di.ə/', N'noun', N'Mạng xã hội', N'Many businesses use social media to connect with customers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'News anchor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'News anchor', N'/njuːz ˈæŋ.kər/', N'/njuːz ˈæŋ.kər/', N'noun', N'Phát thanh viên', N'The news anchor delivered the evening news with confidence.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Content')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Content', N'/ˈkɒn.tent/', N'/ˈkɒn.tent/', N'noun', N'Nội dung', N'High-quality content is essential for engaging readers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Blog')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Blog', N'/blɒɡ/', N'/blɒɡ/', N'noun', N'Blog', N'She runs a successful blog about travel tips.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Podcast')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Podcast', N'/ˈpɒd.kɑːst/', N'/ˈpɒd.kɑːst/', N'noun', N'Podcast', N'The podcast discusses current trends in technology.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Article')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Article', N'/ˈɑː.tɪ.kl/', N'/ˈɑː.tɪ.kl/', N'noun', N'Bài báo', N'The journalist wrote an article about the economic impact of tourism.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Editor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Editor', N'/ˈed.ɪ.tər/', N'/ˈed.ɪ.tər/', N'noun', N'Biên tập viên', N'The editor reviewed the article before publication.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Headline')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Headline', N'/ˈhed.laɪn/', N'/ˈhed.laɪn/', N'noun', N'Tiêu đề', N'The newspaper’s front-page headline grabbed everyone’s attention.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Column')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Column', N'/ˈkɒl.əm/', N'/ˈkɒl.əm/', N'noun', N'Chuyên mục', N'She writes a weekly column on personal finance for the magazine.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Circulation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Circulation', N'/ˌsɜː.kjəˈleɪ.ʃən/', N'/ˌsɜː.kjəˈleɪ.ʃən/', N'noun', N'Lượng phát hành', N'The magazine has a large circulation in the local market.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Coverage')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Coverage', N'/ˈkʌv.ər.ɪdʒ/', N'/ˈkʌv.ər.ɪdʒ/', N'noun', N'Sự đưa tin', N'The election received extensive coverage in the media.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Streaming')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Streaming', N'/ˈstriː.mɪŋ/', N'/ˈstriː.mɪŋ/', N'noun', N'Phát trực tuyến', N'Streaming services like Netflix have revolutionized the way we watch TV.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Press release')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Press release', N'/pres rɪˈliːs/', N'/pres rɪˈliːs/', N'noun', N'Thông cáo báo chí', N'The company issued a press release to announce the new partnership.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Copyright')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Copyright', N'/ˈkɒp.i.raɪt/', N'/ˈkɒp.i.raɪt/', N'noun', N'Bản quyền', N'The artist claimed that the company violated her copyright.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Public relations')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Public relations', N'/ˌpʌb.lɪk rɪˈleɪ.ʃənz/', N'/ˌpʌb.lɪk rɪˈleɪ.ʃənz/', N'noun', N'Quan hệ công chúng', N'The firm hired a public relations agency to improve its image.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Advertisement agency')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Advertisement agency', N'/ədˈvɜː.tɪs.mənt ˈeɪ.dʒən.si/', N'/ədˈvɜː.tɪs.mənt ˈeɪ.dʒən.si/', N'noun', N'Công ty quảng cáo', N'They partnered with a leading advertisement agency for their campaign.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Viewer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Viewer', N'/ˈvjuː.ər/', N'/ˈvjuː.ər/', N'noun', N'Người xem', N'Millions of viewers watched the live broadcast of the event.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Rating')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Rating', N'/ˈreɪ.tɪŋ/', N'/ˈreɪ.tɪŋ/', N'noun', N'Xếp hạng, đánh giá', N'The movie received high ratings from both critics and audiences.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Influencer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Influencer', N'/ˈɪn.flu.ən.sər/', N'/ˈɪn.flu.ən.sər/', N'noun', N'Người ảnh hưởng', N'Social media influencers play a key role in digital marketing.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Viral')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Viral', N'/ˈvaɪ.rəl/', N'/ˈvaɪ.rəl/', N'adjective', N'Lan truyền nhanh', N'The video went viral on social media within hours of being uploaded.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Campaign')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Campaign', N'/kæmˈpeɪn/', N'/kæmˈpeɪn/', N'noun', N'Chiến dịch', N'The company launched a marketing campaign to promote its new product.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Fact-checking')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Fact-checking', N'/fækt ˈtʃek.ɪŋ/', N'/fækt ˈtʃek.ɪŋ/', N'noun', N'Kiểm chứng thông tin', N'Fact-checking is important to ensure accurate reporting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_35 AND Word = N'Journalism')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_35, N'Journalism', N'/ˈdʒɜː.nə.lɪ.zəm/', N'/ˈdʒɜː.nə.lɪ.zəm/', N'noun', N'Nghề báo chí', N'Investigative journalism often uncovers hidden truths.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_35 AND Prompt = N'Từ "Advertisement agency" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_35, N'Từ "Advertisement agency" có nghĩa là gì?', NULL, N'["Kiểm chứng thông tin", "Nghề báo chí", "Công ty quảng cáo", "Người ảnh hưởng"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_35 AND Prompt = N'Từ "Headline" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_35, N'Từ "Headline" có nghĩa là gì?', NULL, N'["Truyền thông", "Lượng phát hành", "Tiêu đề", "Thông cáo báo chí"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_35 AND Prompt = N'Từ "Advertisement" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_35, N'Từ "Advertisement" có nghĩa là gì?', NULL, N'["Quảng cáo", "Tiêu đề", "Podcast", "Truyền thông"]', 0);

-- Chủ đề 36: Điện thoại (Telecommunications) (29 từ)
DECLARE @LessonId_36 INT;
SELECT @LessonId_36 = Id FROM dbo.Lessons WHERE Title = N'Điện thoại (Telecommunications)' AND LanguageCode = 'en';
IF @LessonId_36 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Điện thoại (Telecommunications)', 'en', 'TOEIC 800', 38, 3, 3);
    SET @LessonId_36 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Telephone')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Telephone', N'/ˈtel.ɪ.fəʊn/', N'/ˈtel.ɪ.fəʊn/', N'noun', N'Điện thoại', N'She picked up the telephone to call her friend.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Smartphone')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Smartphone', N'/ˈsmɑːt.fəʊn/', N'/ˈsmɑːt.fəʊn/', N'noun', N'Điện thoại thông minh', N'He uses his smartphone for work and entertainment.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Landline')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Landline', N'/ˈlænd.laɪn/', N'/ˈlænd.laɪn/', N'noun', N'Điện thoại bàn', N'Please call me on my landline during office hours.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Mobile phone')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Mobile phone', N'/ˈməʊ.baɪl fəʊn/', N'/ˈməʊ.baɪl fəʊn/', N'noun', N'Điện thoại di động', N'She always carries her mobile phone in her bag.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Signal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Signal', N'/ˈsɪɡ.nəl/', N'/ˈsɪɡ.nəl/', N'adjective', N'Tín hiệu', N'The phone lost signal in the remote area.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Network')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Network', N'/ˈnet.wɜːk/', N'/ˈnet.wɜːk/', N'noun', N'Mạng', N'The phone is connected to a 4G network.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Voicemail')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Voicemail', N'/ˈvɔɪs.meɪl/', N'/ˈvɔɪs.meɪl/', N'noun', N'Thư thoại', N'I left a voicemail because she didn’t answer the call.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Dial')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Dial', N'/ˈdaɪ.əl/', N'/ˈdaɪ.əl/', N'adjective', N'Quay số', N'Please dial the number carefully.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Extension')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Extension', N'/ɪkˈsten.ʃən/', N'/ɪkˈsten.ʃən/', N'noun', N'Số máy nhánh', N'Call me at extension 202 after 10 AM.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Caller')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Caller', N'/ˈkɔː.lər/', N'/ˈkɔː.lər/', N'noun', N'Người gọi', N'The caller did not leave a message.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Receiver')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Receiver', N'/rɪˈsiː.vər/', N'/rɪˈsiː.vər/', N'noun', N'Ống nghe, người nhận', N'He picked up the receiver and started talking.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Busy signal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Busy signal', N'/ˈbɪz.i ˈsɪɡ.nəl/', N'/ˈbɪz.i ˈsɪɡ.nəl/', N'adjective', N'Tín hiệu bận', N'I kept hearing a busy signal when I called.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Ringtone')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Ringtone', N'/ˈrɪŋ.təʊn/', N'/ˈrɪŋ.təʊn/', N'noun', N'Nhạc chuông', N'She customized her ringtone to her favorite song.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Missed call')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Missed call', N'/mɪst kɔːl/', N'/mɪst kɔːl/', N'noun', N'Cuộc gọi nhỡ', N'I noticed a missed call from my colleague.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Call forwarding')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Call forwarding', N'/ˈkɔːl ˌfɔː.wəd.ɪŋ/', N'/ˈkɔːl ˌfɔː.wəd.ɪŋ/', N'noun', N'Chuyển tiếp cuộc gọi', N'Call forwarding is activated when I’m unavailable.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Text message')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Text message', N'/tekst ˈmes.ɪdʒ/', N'/tekst ˈmes.ɪdʒ/', N'noun', N'Tin nhắn', N'He sent a text message to confirm the appointment.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Conference call')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Conference call', N'/ˈkɒn.fər.əns ˌkɔːl/', N'/ˈkɒn.fər.əns ˌkɔːl/', N'noun', N'Cuộc họp qua điện thoại', N'We held a conference call with the overseas team.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Speakerphone')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Speakerphone', N'/ˈspiː.kə.fəʊn/', N'/ˈspiː.kə.fəʊn/', N'noun', N'Loa ngoài', N'Please put the call on speakerphone so everyone can listen.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Contact list')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Contact list', N'/ˈkɒn.tækt lɪst/', N'/ˈkɒn.tækt lɪst/', N'noun', N'Danh bạ', N'Her contact list includes all her colleagues.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Phone number')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Phone number', N'/fəʊn ˈnʌm.bər/', N'/fəʊn ˈnʌm.bər/', N'noun', N'Số điện thoại', N'Can you give me your phone number so I can call you later?', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Call log')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Call log', N'/kɔːl lɒɡ/', N'/kɔːl lɒɡ/', N'noun', N'Nhật ký cuộc gọi', N'The call log shows all incoming and outgoing calls.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Recharge')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Recharge', N'/ˌriːˈtʃɑːdʒ/', N'/ˌriːˈtʃɑːdʒ/', N'noun', N'Nạp tiền, sạc pin', N'I need to recharge my phone before it runs out of battery.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'SIM card')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'SIM card', N'/ˈsɪm ˌkɑːd/', N'/ˈsɪm ˌkɑːd/', N'noun', N'Thẻ SIM', N'She replaced her SIM card to change her phone number.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Data plan')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Data plan', N'/ˈdeɪ.tə ˌplæn/', N'/ˈdeɪ.tə ˌplæn/', N'noun', N'Gói dữ liệu', N'He upgraded to a premium data plan for faster internet speeds.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Call center')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Call center', N'/ˈkɔːl ˌsen.tər/', N'/ˈkɔːl ˌsen.tər/', N'noun', N'Trung tâm chăm sóc khách hàng', N'The call center handles customer inquiries 24/7.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Voice recognition')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Voice recognition', N'/ˈvɔɪs ˌrek.əɡˈnɪʃ.ən/', N'/ˈvɔɪs ˌrek.əɡˈnɪʃ.ən/', N'noun', N'Nhận diện giọng nói', N'The new phone has advanced voice recognition features.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Bluetooth')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Bluetooth', N'/ˈbluː.tuːθ/', N'/ˈbluː.tuːθ/', N'noun', N'Bluetooth', N'Connect your headphones via Bluetooth for wireless audio.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Charger')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Charger', N'/ˈtʃɑː.dʒər/', N'/ˈtʃɑː.dʒər/', N'noun', N'Bộ sạc', N'I forgot to bring my phone charger.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_36 AND Word = N'Call waiting')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_36, N'Call waiting', N'/kɔːl ˈweɪ.tɪŋ/', N'/kɔːl ˈweɪ.tɪŋ/', N'noun', N'Chờ cuộc gọi', N'The call waiting feature alerts you of another incoming call.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_36 AND Prompt = N'Từ "Text message" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_36, N'Từ "Text message" có nghĩa là gì?', NULL, N'["Nhật ký cuộc gọi", "Tin nhắn", "Cuộc họp qua điện thoại", "Thư thoại"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_36 AND Prompt = N'Từ "Contact list" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_36, N'Từ "Contact list" có nghĩa là gì?', NULL, N'["Danh bạ", "Nhật ký cuộc gọi", "Số điện thoại", "Nhận diện giọng nói"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_36 AND Prompt = N'Từ "Signal" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_36, N'Từ "Signal" có nghĩa là gì?', NULL, N'["Gói dữ liệu", "Loa ngoài", "Tín hiệu", "Số máy nhánh"]', 2);

-- Chủ đề 37: Nông nghiệp (Agriculture) (28 từ)
DECLARE @LessonId_37 INT;
SELECT @LessonId_37 = Id FROM dbo.Lessons WHERE Title = N'Nông nghiệp (Agriculture)' AND LanguageCode = 'en';
IF @LessonId_37 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Nông nghiệp (Agriculture)', 'en', 'TOEIC 800', 39, 3, 3);
    SET @LessonId_37 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Agriculture')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Agriculture', N'/ˈæɡ.rɪ.kʌl.tʃər/', N'/ˈæɡ.rɪ.kʌl.tʃər/', N'noun', N'Nông nghiệp', N'Agriculture plays a vital role in the country’s economy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Farmer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Farmer', N'/ˈfɑː.mər/', N'/ˈfɑː.mər/', N'noun', N'Nông dân', N'The farmer wakes up early to work in the fields.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Crop')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Crop', N'/krɒp/', N'/krɒp/', N'noun', N'Mùa màng, cây trồng', N'The main crop grown in this region is rice.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Harvest')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Harvest', N'/ˈhɑː.vɪst/', N'/ˈhɑː.vɪst/', N'noun', N'Thu hoạch', N'The harvest season begins in October.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Livestock')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Livestock', N'/ˈlaɪv.stɒk/', N'/ˈlaɪv.stɒk/', N'noun', N'Gia súc', N'The farmer raises livestock such as cows and sheep.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Irrigation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Irrigation', N'/ˌɪr.ɪˈɡeɪ.ʃən/', N'/ˌɪr.ɪˈɡeɪ.ʃən/', N'noun', N'Tưới tiêu', N'The government invested in modern irrigation systems.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Fertilizer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Fertilizer', N'/ˈfɜː.tɪ.laɪ.zər/', N'/ˈfɜː.tɪ.laɪ.zər/', N'noun', N'Phân bón', N'The use of organic fertilizer is increasing worldwide.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Pesticide')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Pesticide', N'/ˈpes.tɪ.saɪd/', N'/ˈpes.tɪ.saɪd/', N'noun', N'Thuốc trừ sâu', N'Excessive use of pesticides can harm the environment.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Seed')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Seed', N'/siːd/', N'/siːd/', N'noun', N'Hạt giống', N'Farmers planted seeds to prepare for the new season.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Soil')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Soil', N'/sɔɪl/', N'/sɔɪl/', N'noun', N'Đất', N'Good soil quality is essential for healthy crops.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Tractor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Tractor', N'/ˈtræk.tər/', N'/ˈtræk.tər/', N'noun', N'Máy kéo', N'The tractor helps speed up farming tasks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Greenhouse')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Greenhouse', N'/ˈɡriːn.haʊs/', N'/ˈɡriːn.haʊs/', N'noun', N'Nhà kính', N'Tomatoes are grown in a greenhouse to control their environment.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Organic farming')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Organic farming', N'/ɔːˈɡæn.ɪk ˈfɑː.mɪŋ/', N'/ɔːˈɡæn.ɪk ˈfɑː.mɪŋ/', N'noun', N'Nông nghiệp hữu cơ', N'Organic farming avoids the use of chemical pesticides.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Yield')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Yield', N'/jiːld/', N'/jiːld/', N'noun', N'Năng suất', N'The crop yield this year is higher than expected.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Agribusiness')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Agribusiness', N'/ˈæɡ.rɪˌbɪz.nɪs/', N'/ˈæɡ.rɪˌbɪz.nɪs/', N'noun', N'Kinh doanh nông nghiệp', N'Agribusiness is booming due to global food demand.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Plantation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Plantation', N'/plænˈteɪ.ʃən/', N'/plænˈteɪ.ʃən/', N'noun', N'Đồn điền', N'The tea plantation covers a vast area.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Sustainable farming')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Sustainable farming', N'/səˈsteɪ.nə.bəl ˈfɑː.mɪŋ/', N'/səˈsteɪ.nə.bəl ˈfɑː.mɪŋ/', N'noun', N'Nông nghiệp bền vững', N'Sustainable farming practices protect the environment for future generations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Compost')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Compost', N'/ˈkɒm.pɒst/', N'/ˈkɒm.pɒst/', N'noun', N'Phân hữu cơ', N'Kitchen waste can be turned into compost for the garden.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Dairy farm')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Dairy farm', N'/ˈdeə.ri fɑːm/', N'/ˈdeə.ri fɑːm/', N'noun', N'Trang trại bò sữa', N'The dairy farm produces fresh milk daily.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Grain')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Grain', N'/ɡreɪn/', N'/ɡreɪn/', N'noun', N'Ngũ cốc', N'Wheat is one of the most commonly grown grains.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Poultry')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Poultry', N'/ˈpəʊl.tri/', N'/ˈpəʊl.tri/', N'noun', N'Gia cầm', N'The farm specializes in raising poultry, such as chickens and ducks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Mechanization')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Mechanization', N'/ˌmek.ə.naɪˈzeɪ.ʃən/', N'/ˌmek.ə.naɪˈzeɪ.ʃən/', N'noun', N'Cơ giới hóa', N'Mechanization has increased productivity in modern farming.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Crop rotation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Crop rotation', N'/krɒp rəʊˈteɪ.ʃən/', N'/krɒp rəʊˈteɪ.ʃən/', N'noun', N'Luân canh', N'Crop rotation helps maintain soil fertility.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Fisheries')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Fisheries', N'/ˈfɪʃ.ər.iz/', N'/ˈfɪʃ.ər.iz/', N'noun', N'Ngư nghiệp', N'The government supports sustainable fisheries development.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Horticulture')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Horticulture', N'/ˈhɔː.tɪˌkʌl.tʃər/', N'/ˈhɔː.tɪˌkʌl.tʃər/', N'noun', N'Nghề làm vườn', N'He studied horticulture to manage his family’s orchard.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Weeding')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Weeding', N'/ˈwiː.dɪŋ/', N'/ˈwiː.dɪŋ/', N'noun', N'Nhổ cỏ', N'Weeding is necessary to keep the crops healthy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Subsidy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Subsidy', N'/ˈsʌb.sɪ.di/', N'/ˈsʌb.sɪ.di/', N'noun', N'Trợ cấp', N'Farmers receive government subsidies to improve their productivity.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_37 AND Word = N'Pest control')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_37, N'Pest control', N'/pest kənˈtrəʊl/', N'/pest kənˈtrəʊl/', N'noun', N'Kiểm soát sâu bệnh', N'Effective pest control methods are crucial for crop protection.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_37 AND Prompt = N'Từ "Yield" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_37, N'Từ "Yield" có nghĩa là gì?', NULL, N'["Nghề làm vườn", "Ngũ cốc", "Năng suất", "Mùa màng, cây trồng"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_37 AND Prompt = N'Từ "Subsidy" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_37, N'Từ "Subsidy" có nghĩa là gì?', NULL, N'["Hạt giống", "Mùa màng, cây trồng", "Trợ cấp", "Đất"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_37 AND Prompt = N'Từ "Crop" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_37, N'Từ "Crop" có nghĩa là gì?', NULL, N'["Trang trại bò sữa", "Mùa màng, cây trồng", "Nhổ cỏ", "Phân bón"]', 1);

-- Chủ đề 38: Thực phẩm và đồ uống (Food & Beverage) (30 từ)
DECLARE @LessonId_38 INT;
SELECT @LessonId_38 = Id FROM dbo.Lessons WHERE Title = N'Thực phẩm và đồ uống (Food & Beverage)' AND LanguageCode = 'en';
IF @LessonId_38 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Thực phẩm và đồ uống (Food & Beverage)', 'en', 'TOEIC 800', 40, 3, 3);
    SET @LessonId_38 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Cuisine')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Cuisine', N'/kwɪˈziːn/', N'/kwɪˈziːn/', N'noun', N'Ẩm thực', N'Italian cuisine is popular around the world.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Beverage')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Beverage', N'/ˈbev.ər.ɪdʒ/', N'/ˈbev.ər.ɪdʒ/', N'noun', N'Đồ uống', N'The restaurant offers a variety of beverages, including coffee and tea.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Meal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Meal', N'/miːl/', N'/miːl/', N'adjective', N'Bữa ăn', N'Breakfast is the most important meal of the day.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Dish')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Dish', N'/dɪʃ/', N'/dɪʃ/', N'adjective', N'Món ăn', N'Their signature dish is grilled salmon with lemon sauce.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Dessert')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Dessert', N'/dɪˈzɜːt/', N'/dɪˈzɜːt/', N'noun', N'Món tráng miệng', N'For dessert, we ordered chocolate cake.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Ingredient')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Ingredient', N'/ɪnˈɡriː.di.ənt/', N'/ɪnˈɡriː.di.ənt/', N'noun', N'Nguyên liệu', N'Fresh ingredients make all the difference in cooking.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Recipe')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Recipe', N'/ˈres.ɪ.pi/', N'/ˈres.ɪ.pi/', N'noun', N'Công thức', N'She followed the recipe carefully to bake the cake.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Buffet')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Buffet', N'/ˈbʊf.eɪ/ or /bəˈfeɪ/', N'/ˈbʊf.eɪ/ or /bəˈfeɪ/', N'noun', N'Tiệc tự chọn', N'The hotel serves a breakfast buffet every morning.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Appetizer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Appetizer', N'/ˈæp.ɪ.taɪ.zər/', N'/ˈæp.ɪ.taɪ.zər/', N'noun', N'Món khai vị', N'We started with a light appetizer before the main course.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Main course')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Main course', N'/meɪn kɔːs/', N'/meɪn kɔːs/', N'noun', N'Món chính', N'The main course was a perfectly cooked steak.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Takeaway')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Takeaway', N'/ˈteɪk.ə.weɪ/', N'/ˈteɪk.ə.weɪ/', N'noun', N'Đồ ăn mang về', N'We ordered a pizza for takeaway.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Fast food')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Fast food', N'/fɑːst fuːd/', N'/fɑːst fuːd/', N'noun', N'Thức ăn nhanh', N'Burgers and fries are common fast food choices.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Fine dining')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Fine dining', N'/faɪn ˈdaɪ.nɪŋ/', N'/faɪn ˈdaɪ.nɪŋ/', N'noun', N'Ẩm thực cao cấp', N'The restaurant offers a fine dining experience with gourmet dishes.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Refreshment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Refreshment', N'/rɪˈfreʃ.mənt/', N'/rɪˈfreʃ.mənt/', N'noun', N'Đồ ăn, thức uống nhẹ', N'Light refreshments were served during the meeting.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Chef')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Chef', N'/ʃef/', N'/ʃef/', N'noun', N'Đầu bếp', N'The chef prepared a delicious five-course meal.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Bartender')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Bartender', N'/ˈbɑː.tendər/', N'/ˈbɑː.tendər/', N'noun', N'Nhân viên pha chế', N'The bartender made us some excellent cocktails.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Waiter/Waitress')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Waiter/Waitress', N'/ˈweɪ.tər/ /ˈweɪ.trəs/', N'/ˈweɪ.tər/ /ˈweɪ.trəs/', N'noun', N'Bồi bàn nam/nữ', N'The waitress was very attentive and friendly.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Menu')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Menu', N'/ˈmen.juː/', N'/ˈmen.juː/', N'noun', N'Thực đơn', N'The restaurant has a diverse menu with options for everyone.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Catering')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Catering', N'/ˈkeɪ.tər.ɪŋ/', N'/ˈkeɪ.tər.ɪŋ/', N'noun', N'Dịch vụ ăn uống', N'The company provides catering for corporate events.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Utensils')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Utensils', N'/juːˈten.sɪlz/', N'/juːˈten.sɪlz/', N'noun', N'Dụng cụ ăn uống', N'Please set the table with utensils, plates, and glasses.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Beverage menu')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Beverage menu', N'/ˈbev.ər.ɪdʒ ˈmen.juː/', N'/ˈbev.ər.ɪdʒ ˈmen.juː/', N'noun', N'Thực đơn đồ uống', N'The beverage menu includes wines, beers, and soft drinks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Vegetarian')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Vegetarian', N'/ˌvedʒ.ɪˈteə.ri.ən/', N'/ˌvedʒ.ɪˈteə.ri.ən/', N'noun', N'Người ăn chay, món chay', N'The restaurant offers a wide range of vegetarian dishes.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Spicy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Spicy', N'/ˈspaɪ.si/', N'/ˈspaɪ.si/', N'noun', N'Cay', N'This dish is too spicy for my taste.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Sweet')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Sweet', N'/swiːt/', N'/swiːt/', N'noun', N'Ngọt', N'The cake was very sweet and delicious.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Savory')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Savory', N'/ˈseɪ.vər.i/', N'/ˈseɪ.vər.i/', N'noun', N'Mặn', N'The pie has a rich, savory flavor.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Beverage dispenser')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Beverage dispenser', N'/ˈbev.ər.ɪdʒ dɪˈspen.sər/', N'/ˈbev.ər.ɪdʒ dɪˈspen.sər/', N'noun', N'Máy bán đồ uống', N'There’s a beverage dispenser in the break room.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Table reservation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Table reservation', N'/ˈteɪ.bəl ˌrez.əˈveɪ.ʃən/', N'/ˈteɪ.bəl ˌrez.əˈveɪ.ʃən/', N'noun', N'Đặt bàn', N'I made a table reservation for two at 7 PM.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Allergies')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Allergies', N'/ˈæl.ə.dʒiz/', N'/ˈæl.ə.dʒiz/', N'noun', N'Dị ứng thực phẩm', N'Please inform the staff of any food allergies you have.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Carbonated drink')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Carbonated drink', N'/ˈkɑː.bə.neɪ.tɪd ˌdrɪŋk/', N'/ˈkɑː.bə.neɪ.tɪd ˌdrɪŋk/', N'noun', N'Đồ uống có ga', N'Soda is a popular carbonated drink.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_38 AND Word = N'Non-alcoholic')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_38, N'Non-alcoholic', N'/ˌnɒn.æl.kəˈhɒl.ɪk/', N'/ˌnɒn.æl.kəˈhɒl.ɪk/', N'adjective', N'Không có cồn', N'The bar also serves non-alcoholic beverages.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_38 AND Prompt = N'Từ "Dish" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_38, N'Từ "Dish" có nghĩa là gì?', NULL, N'["Đồ uống có ga", "Đồ ăn, thức uống nhẹ", "Món ăn", "Đặt bàn"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_38 AND Prompt = N'Từ "Appetizer" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_38, N'Từ "Appetizer" có nghĩa là gì?', NULL, N'["Cay", "Không có cồn", "Đồ uống có ga", "Món khai vị"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_38 AND Prompt = N'Từ "Catering" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_38, N'Từ "Catering" có nghĩa là gì?', NULL, N'["Đặt bàn", "Bồi bàn nam/nữ", "Dịch vụ ăn uống", "Dị ứng thực phẩm"]', 2);

-- Chủ đề 39: Vận tải (Transportation Systems) (32 từ)
DECLARE @LessonId_39 INT;
SELECT @LessonId_39 = Id FROM dbo.Lessons WHERE Title = N'Vận tải (Transportation Systems)' AND LanguageCode = 'en';
IF @LessonId_39 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Vận tải (Transportation Systems)', 'en', 'TOEIC 800', 41, 3, 3);
    SET @LessonId_39 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Transportation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Transportation', N'/ˌtræn.spɔːˈteɪ.ʃən/', N'/ˌtræn.spɔːˈteɪ.ʃən/', N'noun', N'Vận tải, giao thông', N'Public transportation is essential in urban areas.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Vehicle')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Vehicle', N'/ˈviː.ɪ.kəl/', N'/ˈviː.ɪ.kəl/', N'noun', N'Phương tiện', N'This parking lot can hold up to 500 vehicles.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Cargo')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Cargo', N'/ˈkɑː.ɡəʊ/', N'/ˈkɑː.ɡəʊ/', N'noun', N'Hàng hóa', N'The ship is carrying a large amount of cargo.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Freight')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Freight', N'/freɪt/', N'/freɪt/', N'noun', N'Hàng hóa (vận tải)', N'The company specializes in freight transport.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Logistics')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Logistics', N'/ləˈdʒɪs.tɪks/', N'/ləˈdʒɪs.tɪks/', N'noun', N'Hậu cần', N'Efficient logistics are crucial for timely deliveries.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Shipping')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Shipping', N'/ˈʃɪp.ɪŋ/', N'/ˈʃɪp.ɪŋ/', N'noun', N'Vận chuyển đường biển', N'The cost of shipping has increased this year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Railway')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Railway', N'/ˈreɪl.weɪ/', N'/ˈreɪl.weɪ/', N'noun', N'Đường sắt', N'The government is investing in the railway system.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Airline')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Airline', N'/ˈeə.laɪn/', N'/ˈeə.laɪn/', N'noun', N'Hãng hàng không', N'The airline offers affordable international flights.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Terminal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Terminal', N'/ˈtɜː.mɪ.nəl/', N'/ˈtɜː.mɪ.nəl/', N'adjective', N'Nhà ga', N'The bus departs from Terminal 3 at 8:00 AM.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Passenger')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Passenger', N'/ˈpæs.ɪn.dʒər/', N'/ˈpæs.ɪn.dʒər/', N'noun', N'Hành khách', N'The passenger showed her ticket to the conductor.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Ticket')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Ticket', N'/ˈtɪk.ɪt/', N'/ˈtɪk.ɪt/', N'noun', N'Vé', N'Please buy your ticket at the counter before boarding.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Traffic')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Traffic', N'/ˈtræf.ɪk/', N'/ˈtræf.ɪk/', N'adjective', N'Giao thông', N'The traffic in the city is very heavy during rush hours.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Public transport')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Public transport', N'/ˌpʌb.lɪk ˈtræn.spɔːt/', N'/ˌpʌb.lɪk ˈtræn.spɔːt/', N'noun', N'Giao thông công cộng', N'More people are using public transport to save money.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Taxi')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Taxi', N'/ˈtæk.si/', N'/ˈtæk.si/', N'noun', N'Taxi', N'We took a taxi to the airport to save time.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Ride-sharing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Ride-sharing', N'/ˈraɪd ˌʃeə.rɪŋ/', N'/ˈraɪd ˌʃeə.rɪŋ/', N'noun', N'Chia sẻ xe (dịch vụ)', N'Many commuters now prefer ride-sharing apps for convenience.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Highway')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Highway', N'/ˈhaɪ.weɪ/', N'/ˈhaɪ.weɪ/', N'noun', N'Đường cao tốc', N'The highway connects the city to nearby towns.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Toll road')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Toll road', N'/ˈtəʊl ˌrəʊd/', N'/ˈtəʊl ˌrəʊd/', N'noun', N'Đường có thu phí', N'Drivers need to pay a fee to use the toll road.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Fuel')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Fuel', N'/fjʊəl/', N'/fjʊəl/', N'noun', N'Nhiên liệu', N'Electric vehicles help reduce fuel consumption.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Delivery')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Delivery', N'/dɪˈlɪv.ər.i/', N'/dɪˈlɪv.ər.i/', N'noun', N'Giao hàng', N'The company guarantees same-day delivery for all orders.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Transit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Transit', N'/ˈtræn.zɪt/', N'/ˈtræn.zɪt/', N'noun', N'Quá cảnh, vận chuyển', N'The shipment is currently in transit.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Port')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Port', N'/pɔːt/', N'/pɔːt/', N'noun', N'Cảng', N'The cargo ship docked at the port yesterday.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Route')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Route', N'/ruːt/ or /raʊt/', N'/ruːt/ or /raʊt/', N'noun', N'Tuyến đường', N'This is the fastest route to the city center.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Driver')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Driver', N'/ˈdraɪ.vər/', N'/ˈdraɪ.vər/', N'noun', N'Tài xế', N'The driver was very polite and professional.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Bicycle')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Bicycle', N'/ˈbaɪ.sɪ.kəl/', N'/ˈbaɪ.sɪ.kəl/', N'noun', N'Xe đạp', N'Riding a bicycle is a great way to stay fit and reduce pollution.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Motorbike')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Motorbike', N'/ˈməʊ.tə.baɪk/', N'/ˈməʊ.tə.baɪk/', N'noun', N'Xe máy', N'He commutes to work on his motorbike every day.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Plane')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Plane', N'/pleɪn/', N'/pleɪn/', N'noun', N'Máy bay', N'The plane landed safely despite the bad weather.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Cruise')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Cruise', N'/kruːz/', N'/kruːz/', N'verb', N'Du thuyền', N'They went on a luxury cruise around the Mediterranean.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Cargo ship')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Cargo ship', N'/ˈkɑː.ɡəʊ ˌʃɪp/', N'/ˈkɑː.ɡəʊ ˌʃɪp/', N'noun', N'Tàu chở hàng', N'The cargo ship carries goods across the Atlantic.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Pipeline')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Pipeline', N'/ˈpaɪp.laɪn/', N'/ˈpaɪp.laɪn/', N'noun', N'Đường ống vận chuyển', N'Oil is transported via pipeline to the refinery.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Commuter')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Commuter', N'/kəˈmjuː.tər/', N'/kəˈmjuː.tər/', N'noun', N'Người đi làm xa', N'Many commuters use the subway during rush hours.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Subway')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Subway', N'/ˈsʌb.weɪ/', N'/ˈsʌb.weɪ/', N'noun', N'Tàu điện ngầm', N'The subway is the fastest way to get around the city.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_39 AND Word = N'Freight train')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_39, N'Freight train', N'/freɪt treɪn/', N'/freɪt treɪn/', N'noun', N'Tàu chở hàng', N'The freight train delivers goods to inland areas.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_39 AND Prompt = N'Từ "Commuter" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_39, N'Từ "Commuter" có nghĩa là gì?', NULL, N'["Vận tải, giao thông", "Nhiên liệu", "Người đi làm xa", "Tuyến đường"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_39 AND Prompt = N'Từ "Cruise" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_39, N'Từ "Cruise" có nghĩa là gì?', NULL, N'["Tuyến đường", "Du thuyền", "Hậu cần", "Taxi"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_39 AND Prompt = N'Từ "Toll road" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_39, N'Từ "Toll road" có nghĩa là gì?', NULL, N'["Hậu cần", "Đường có thu phí", "Đường sắt", "Hành khách"]', 1);

-- Chủ đề 40: An toàn lao động (Workplace Safety) (28 từ)
DECLARE @LessonId_40 INT;
SELECT @LessonId_40 = Id FROM dbo.Lessons WHERE Title = N'An toàn lao động (Workplace Safety)' AND LanguageCode = 'en';
IF @LessonId_40 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'An toàn lao động (Workplace Safety)', 'en', 'TOEIC 800', 42, 3, 3);
    SET @LessonId_40 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Workplace safety')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Workplace safety', N'/ˈwɜːkpleɪs ˈseɪf.ti/', N'/ˈwɜːkpleɪs ˈseɪf.ti/', N'noun', N'An toàn lao động', N'Workplace safety is essential to prevent accidents.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Hazard')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Hazard', N'/ˈhæz.əd/', N'/ˈhæz.əd/', N'noun', N'Nguy hiểm, rủi ro', N'Employees must be aware of potential hazards in the workplace.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Protective equipment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Protective equipment', N'/prəˈtek.tɪv ɪˈkwɪp.mənt/', N'/prəˈtek.tɪv ɪˈkwɪp.mənt/', N'noun', N'Thiết bị bảo hộ', N'Workers are required to wear protective equipment at all times.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Safety goggles')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Safety goggles', N'/ˈseɪf.ti ˌɡɒɡ.lz/', N'/ˈseɪf.ti ˌɡɒɡ.lz/', N'noun', N'Kính bảo hộ', N'Safety goggles protect the eyes from dust and debris.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Hard hat')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Hard hat', N'/ˈhɑːd ˌhæt/', N'/ˈhɑːd ˌhæt/', N'noun', N'Mũ bảo hộ', N'Wearing a hard hat is mandatory on construction sites.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Gloves')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Gloves', N'/ɡlʌvz/', N'/ɡlʌvz/', N'noun', N'Găng tay bảo hộ', N'Gloves should be worn when handling chemicals.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'First aid')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'First aid', N'/ˌfɜːst ˈeɪd/', N'/ˌfɜːst ˈeɪd/', N'noun', N'Sơ cứu', N'All employees should know basic first aid procedures.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Emergency exit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Emergency exit', N'/ɪˈmɜː.dʒən.si ˈek.sɪt/', N'/ɪˈmɜː.dʒən.si ˈek.sɪt/', N'noun', N'Lối thoát hiểm', N'The emergency exit should always be clear of obstacles.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Fire extinguisher')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Fire extinguisher', N'/ˈfaɪər ɪkˌstɪŋ.ɡwɪ.ʃər/', N'/ˈfaɪər ɪkˌstɪŋ.ɡwɪ.ʃər/', N'noun', N'Bình chữa cháy', N'Learn how to use a fire extinguisher in case of a fire.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Safety inspection')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Safety inspection', N'/ˈseɪf.ti ɪnˈspek.ʃən/', N'/ˈseɪf.ti ɪnˈspek.ʃən/', N'noun', N'Kiểm tra an toàn', N'The factory undergoes regular safety inspections.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Accident report')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Accident report', N'/ˈæk.sɪ.dənt rɪˈpɔːt/', N'/ˈæk.sɪ.dənt rɪˈpɔːt/', N'noun', N'Báo cáo tai nạn', N'After the incident, an accident report was filed.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Safety training')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Safety training', N'/ˈseɪf.ti ˈtreɪ.nɪŋ/', N'/ˈseɪf.ti ˈtreɪ.nɪŋ/', N'noun', N'Đào tạo an toàn', N'Employees must attend safety training sessions annually.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Fire drill')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Fire drill', N'/ˈfaɪər ˌdrɪl/', N'/ˈfaɪər ˌdrɪl/', N'noun', N'Diễn tập chữa cháy', N'A fire drill was conducted to prepare employees for emergencies.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Warning sign')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Warning sign', N'/ˈwɔː.nɪŋ ˌsaɪn/', N'/ˈwɔː.nɪŋ ˌsaɪn/', N'noun', N'Biển cảnh báo', N'There is a warning sign indicating hazardous materials in the area.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Safety policy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Safety policy', N'/ˈseɪf.ti ˈpɒl.ɪ.si/', N'/ˈseɪf.ti ˈpɒl.ɪ.si/', N'noun', N'Chính sách an toàn', N'The company enforces strict safety policies for all workers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Risk assessment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Risk assessment', N'/rɪsk əˈses.mənt/', N'/rɪsk əˈses.mənt/', N'noun', N'Đánh giá rủi ro', N'Conducting a risk assessment helps identify potential hazards.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Lockout/tagout')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Lockout/tagout', N'/ˌlɒk.aʊt ˈtæɡ.aʊt/', N'/ˌlɒk.aʊt ˈtæɡ.aʊt/', N'noun', N'Quy trình khóa/ngắt máy móc', N'The lockout/tagout procedure prevents accidental machine startup.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Ergonomics')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Ergonomics', N'/ˌɜː.ɡəˈnɒm.ɪks/', N'/ˌɜː.ɡəˈnɒm.ɪks/', N'noun', N'Công thái học', N'Ergonomics helps design a safer and more comfortable workplace.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Compliance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Compliance', N'/kəmˈplaɪ.əns/', N'/kəmˈplaɪ.əns/', N'noun', N'Tuân thủ', N'All employees must ensure compliance with safety regulations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Incident')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Incident', N'/ˈɪn.sɪ.dənt/', N'/ˈɪn.sɪ.dənt/', N'noun', N'Sự cố', N'The safety team investigated the incident to prevent future accidents.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Respirator')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Respirator', N'/ˈres.pɪ.reɪ.tər/', N'/ˈres.pɪ.reɪ.tər/', N'noun', N'Mặt nạ phòng độc', N'Workers in dusty environments must wear a respirator.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Safety harness')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Safety harness', N'/ˈseɪf.ti ˌhɑː.nɪs/', N'/ˈseɪf.ti ˌhɑː.nɪs/', N'noun', N'Đai an toàn', N'Employees working at heights are required to wear a safety harness.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Chemical spill')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Chemical spill', N'/ˈkem.ɪ.kəl ˌspɪl/', N'/ˈkem.ɪ.kəl ˌspɪl/', N'noun', N'Tràn hóa chất', N'A chemical spill was quickly contained by the safety team.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Emergency procedure')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Emergency procedure', N'/ɪˈmɜː.dʒən.si prəˈsiː.dʒər/', N'/ɪˈmɜː.dʒən.si prəˈsiː.dʒər/', N'noun', N'Quy trình khẩn cấp', N'Employees should follow the emergency procedure during evacuations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Health hazard')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Health hazard', N'/helθ ˈhæz.əd/', N'/helθ ˈhæz.əd/', N'noun', N'Mối nguy hại sức khỏe', N'Long-term exposure to chemicals can be a health hazard.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Slip-resistant shoes')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Slip-resistant shoes', N'/slɪp rɪˈzɪs.tənt ˌʃuːz/', N'/slɪp rɪˈzɪs.tənt ˌʃuːz/', N'noun', N'Giày chống trượt', N'Workers in wet areas should wear slip-resistant shoes.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Overhead hazard')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Overhead hazard', N'/ˌəʊ.vəˈhed ˈhæz.əd/', N'/ˌəʊ.vəˈhed ˈhæz.əd/', N'noun', N'Nguy hiểm từ trên cao', N'Helmets are required to protect against overhead hazards.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_40 AND Word = N'Safe work practices')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_40, N'Safe work practices', N'/seɪf wɜːk ˈpræk.tɪsɪz/', N'/seɪf wɜːk ˈpræk.tɪsɪz/', N'noun', N'Thực hành làm việc an toàn', N'The company promotes safe work practices to prevent injuries.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_40 AND Prompt = N'Từ "Safety inspection" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_40, N'Từ "Safety inspection" có nghĩa là gì?', NULL, N'["Thiết bị bảo hộ", "Diễn tập chữa cháy", "Mặt nạ phòng độc", "Kiểm tra an toàn"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_40 AND Prompt = N'Từ "Emergency exit" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_40, N'Từ "Emergency exit" có nghĩa là gì?', NULL, N'["Kính bảo hộ", "Đánh giá rủi ro", "Kiểm tra an toàn", "Lối thoát hiểm"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_40 AND Prompt = N'Từ "Ergonomics" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_40, N'Từ "Ergonomics" có nghĩa là gì?', NULL, N'["Bình chữa cháy", "Công thái học", "Mối nguy hại sức khỏe", "Tràn hóa chất"]', 1);

-- Chủ đề 41: Tài nguyên thiên nhiên (Natural Resources) (28 từ)
DECLARE @LessonId_41 INT;
SELECT @LessonId_41 = Id FROM dbo.Lessons WHERE Title = N'Tài nguyên thiên nhiên (Natural Resources)' AND LanguageCode = 'en';
IF @LessonId_41 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Tài nguyên thiên nhiên (Natural Resources)', 'en', 'TOEIC 800', 43, 3, 3);
    SET @LessonId_41 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Natural resources')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Natural resources', N'/ˈnætʃ.ər.əl rɪˈzɔː.sɪz/', N'/ˈnætʃ.ər.əl rɪˈzɔː.sɪz/', N'noun', N'Tài nguyên thiên nhiên', N'Natural resources include water, forests, and minerals.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Renewable resource')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Renewable resource', N'/rɪˈnjuː.ə.bəl rɪˈzɔːs/', N'/rɪˈnjuː.ə.bəl rɪˈzɔːs/', N'noun', N'Tài nguyên tái tạo', N'Solar energy is a type of renewable resource.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Non-renewable resource')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Non-renewable resource', N'/ˌnɒn.rɪˈnjuː.ə.bəl rɪˈzɔːs/', N'/ˌnɒn.rɪˈnjuː.ə.bəl rɪˈzɔːs/', N'noun', N'Tài nguyên không tái tạo', N'Oil is an example of a non-renewable resource.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Water resource')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Water resource', N'/ˈwɔː.tər rɪˈzɔːs/', N'/ˈwɔː.tər rɪˈzɔːs/', N'noun', N'Nguồn nước', N'Managing water resources is crucial in arid regions.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Fossil fuels')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Fossil fuels', N'/ˈfɒs.əl ˌfjʊəlz/', N'/ˈfɒs.əl ˌfjʊəlz/', N'noun', N'Nhiên liệu hóa thạch', N'Burning fossil fuels contributes to air pollution.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Mineral')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Mineral', N'/ˈmɪn.ər.əl/', N'/ˈmɪn.ər.əl/', N'adjective', N'Khoáng sản', N'The country is rich in natural minerals like gold and silver.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Coal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Coal', N'/kəʊl/', N'/kəʊl/', N'adjective', N'Than đá', N'Many power plants still rely on coal as an energy source.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Oil')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Oil', N'/ɔɪl/', N'/ɔɪl/', N'noun', N'Dầu mỏ', N'The demand for oil has increased significantly over the years.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Natural gas')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Natural gas', N'/ˈnætʃ.ər.əl ɡæs/', N'/ˈnætʃ.ər.əl ɡæs/', N'noun', N'Khí đốt tự nhiên', N'Natural gas is a cleaner alternative to coal.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Forest')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Forest', N'/ˈfɒr.ɪst/', N'/ˈfɒr.ɪst/', N'noun', N'Rừng', N'The government is working to protect the remaining forests.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Wildlife')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Wildlife', N'/ˈwaɪld.laɪf/', N'/ˈwaɪld.laɪf/', N'noun', N'Động vật hoang dã', N'The region is known for its diverse wildlife.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Biodiversity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Biodiversity', N'/ˌbaɪ.əʊ.daɪˈvɜː.sɪ.ti/', N'/ˌbaɪ.əʊ.daɪˈvɜː.sɪ.ti/', N'noun', N'Đa dạng sinh học', N'Protecting biodiversity ensures the stability of ecosystems.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Timber')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Timber', N'/ˈtɪm.bər/', N'/ˈtɪm.bər/', N'noun', N'Gỗ', N'The construction industry heavily depends on timber.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Soil')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Soil', N'/sɔɪl/', N'/sɔɪl/', N'noun', N'Đất', N'Fertile soil is essential for agriculture.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Land')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Land', N'/lænd/', N'/lænd/', N'noun', N'Đất đai', N'The government has allocated land for conservation purposes.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Renewable energy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Renewable energy', N'/rɪˈnjuː.ə.bəl ˈen.ə.dʒi/', N'/rɪˈnjuː.ə.bəl ˈen.ə.dʒi/', N'noun', N'Năng lượng tái tạo', N'Renewable energy, such as wind and solar, is becoming more popular.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Solar energy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Solar energy', N'/ˈsəʊ.lər ˈen.ə.dʒi/', N'/ˈsəʊ.lər ˈen.ə.dʒi/', N'noun', N'Năng lượng mặt trời', N'Many households are switching to solar energy to save on electricity.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Wind energy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Wind energy', N'/wɪnd ˈen.ə.dʒi/', N'/wɪnd ˈen.ə.dʒi/', N'noun', N'Năng lượng gió', N'Wind energy is a clean and sustainable power source.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Hydropower')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Hydropower', N'/ˈhaɪ.drəʊˌpaʊər/', N'/ˈhaɪ.drəʊˌpaʊər/', N'noun', N'Thủy điện', N'Hydropower plants generate electricity from water.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Geothermal energy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Geothermal energy', N'/ˌdʒiː.əʊˈθɜː.məl ˈen.ə.dʒi/', N'/ˌdʒiː.əʊˈθɜː.məl ˈen.ə.dʒi/', N'noun', N'Năng lượng địa nhiệt', N'Geothermal energy is harnessed from heat within the Earth.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Conservation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Conservation', N'/ˌkɒn.səˈveɪ.ʃən/', N'/ˌkɒn.səˈveɪ.ʃən/', N'noun', N'Bảo tồn', N'Conservation efforts are needed to protect endangered species.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Deforestation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Deforestation', N'/ˌdiːˌfɒr.ɪˈsteɪ.ʃən/', N'/ˌdiːˌfɒr.ɪˈsteɪ.ʃən/', N'noun', N'Phá rừng', N'Deforestation has led to a loss of habitat for many species.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Pollution')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Pollution', N'/pəˈluː.ʃən/', N'/pəˈluː.ʃən/', N'noun', N'Ô nhiễm', N'Air and water pollution are major environmental concerns.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Ecosystem')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Ecosystem', N'/ˈiː.kəʊˌsɪs.təm/', N'/ˈiː.kəʊˌsɪs.təm/', N'noun', N'Hệ sinh thái', N'Preserving the ecosystem is essential for future generations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Climate change')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Climate change', N'/ˈklaɪ.mət tʃeɪndʒ/', N'/ˈklaɪ.mət tʃeɪndʒ/', N'noun', N'Biến đổi khí hậu', N'Climate change is affecting natural resource availability.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Recycling')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Recycling', N'/ˌriːˈsaɪ.klɪŋ/', N'/ˌriːˈsaɪ.klɪŋ/', N'noun', N'Tái chế', N'Recycling reduces the need for extracting natural resources.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Sustainable development')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Sustainable development', N'/səˈsteɪ.nə.bəl dɪˈvel.əp.mənt/', N'/səˈsteɪ.nə.bəl dɪˈvel.əp.mənt/', N'noun', N'Phát triển bền vững', N'Sustainable development aims to balance economic growth and resource preservation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_41 AND Word = N'Overexploitation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_41, N'Overexploitation', N'/ˌəʊ.vərˌek.splɔɪˈteɪ.ʃən/', N'/ˌəʊ.vərˌek.splɔɪˈteɪ.ʃən/', N'noun', N'Khai thác quá mức', N'Overexploitation of resources can lead to their depletion.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_41 AND Prompt = N'Từ "Overexploitation" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_41, N'Từ "Overexploitation" có nghĩa là gì?', NULL, N'["Khai thác quá mức", "Tái chế", "Rừng", "Năng lượng gió"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_41 AND Prompt = N'Từ "Renewable energy" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_41, N'Từ "Renewable energy" có nghĩa là gì?', NULL, N'["Đất", "Năng lượng tái tạo", "Phát triển bền vững", "Dầu mỏ"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_41 AND Prompt = N'Từ "Timber" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_41, N'Từ "Timber" có nghĩa là gì?', NULL, N'["Năng lượng địa nhiệt", "Rừng", "Tái chế", "Gỗ"]', 3);

-- Chủ đề 42: Sản phẩm và dịch vụ (Products & Services) (28 từ)
DECLARE @LessonId_42 INT;
SELECT @LessonId_42 = Id FROM dbo.Lessons WHERE Title = N'Sản phẩm và dịch vụ (Products & Services)' AND LanguageCode = 'en';
IF @LessonId_42 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Sản phẩm và dịch vụ (Products & Services)', 'en', 'TOEIC 800', 44, 3, 3);
    SET @LessonId_42 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Product')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Product', N'/ˈprɒdʌkt/', N'/ˈprɒdʌkt/', N'noun', N'Sản phẩm', N'The company launched a new product last week.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Service')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Service', N'/ˈsɜːvɪs/', N'/ˈsɜːvɪs/', N'noun', N'Dịch vụ', N'Customer service is available 24/7.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Quality')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Quality', N'/ˈkwɒlɪti/', N'/ˈkwɒlɪti/', N'noun', N'Chất lượng', N'The company is known for the high quality of its products.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Feature')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Feature', N'/ˈfiːtʃər/', N'/ˈfiːtʃər/', N'noun', N'Tính năng', N'One of the features of the phone is its long battery life.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Brand')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Brand', N'/brænd/', N'/brænd/', N'noun', N'Thương hiệu', N'The brand is recognized worldwide for its innovative designs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Warranty')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Warranty', N'/ˈwɒrənti/', N'/ˈwɒrənti/', N'noun', N'Bảo hành', N'The warranty covers repairs for one year after purchase.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Return policy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Return policy', N'/rɪˈtɜːn ˈpɒlɪsi/', N'/rɪˈtɜːn ˈpɒlɪsi/', N'noun', N'Chính sách hoàn trả', N'The store has a 30-day return policy for all products.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Subscription')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Subscription', N'/səbˈskrɪpʃən/', N'/səbˈskrɪpʃən/', N'noun', N'Đăng ký, thuê bao', N'The subscription to the magazine is renewed annually.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Discount')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Discount', N'/ˈdɪskaʊnt/', N'/ˈdɪskaʊnt/', N'noun', N'Giảm giá', N'The store is offering a 20% discount on selected items.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Supplier')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Supplier', N'/səˈplaɪər/', N'/səˈplaɪər/', N'noun', N'Nhà cung cấp', N'The company relies on a trusted supplier for raw materials.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Demand')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Demand', N'/dɪˈmɑːnd/', N'/dɪˈmɑːnd/', N'noun', N'Nhu cầu', N'There is high demand for eco-friendly products.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Price')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Price', N'/praɪs/', N'/praɪs/', N'noun', N'Giá', N'The price of the product was reduced during the sale.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Packaging')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Packaging', N'/ˈpækɪdʒɪŋ/', N'/ˈpækɪdʒɪŋ/', N'noun', N'Bao bì', N'The packaging of the product is environmentally friendly.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Promotion')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Promotion', N'/prəˈməʊʃən/', N'/prəˈməʊʃən/', N'noun', N'Khuyến mãi', N'The store has a special promotion for new customers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Retail')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Retail', N'/ˈriː.teɪl/', N'/ˈriː.teɪl/', N'noun', N'Bán lẻ', N'The product is available at many retail stores across the country.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Customization')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Customization', N'/ˌkʌstəməˈzeɪʃən/', N'/ˌkʌstəməˈzeɪʃən/', N'noun', N'Tùy chỉnh', N'The company offers customization options for its products.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Guarantee')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Guarantee', N'/ˌɡærənˈtiː/', N'/ˌɡærənˈtiː/', N'noun', N'Bảo đảm, cam kết', N'The guarantee promises a full refund if you’re not satisfied.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Service contract')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Service contract', N'/ˈsɜːvɪs ˈkɒntrækt/', N'/ˈsɜːvɪs ˈkɒntrækt/', N'noun', N'Hợp đồng dịch vụ', N'A service contract includes maintenance and repair services.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Upgrade')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Upgrade', N'/ˈʌpɡreɪd/', N'/ˈʌpɡreɪd/', N'noun', N'Nâng cấp', N'The company is offering an upgrade to the latest version of the software.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Retailer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Retailer', N'/ˈriːˌteɪlər/', N'/ˈriːˌteɪlər/', N'noun', N'Người bán lẻ', N'The retailer offers a wide variety of products from different brands.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'After-sales service')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'After-sales service', N'/ˈɑːftər seɪlz ˈsɜːvɪs/', N'/ˈɑːftər seɪlz ˈsɜːvɪs/', N'noun', N'Dịch vụ hậu mãi', N'The company provides excellent after-sales service for its products.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Subscription fee')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Subscription fee', N'/səbˈskrɪpʃən fiː/', N'/səbˈskrɪpʃən fiː/', N'noun', N'Phí đăng ký', N'The subscription fee is charged annually for continued access.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Consumer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Consumer', N'/kənˈsjuːmər/', N'/kənˈsjuːmər/', N'noun', N'Người tiêu dùng', N'Consumers are increasingly interested in sustainable products.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Client')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Client', N'/ˈklaɪənt/', N'/ˈklaɪənt/', N'noun', N'Khách hàng', N'The company values its long-term relationship with clients.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Product line')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Product line', N'/ˈprɒdʌkt laɪn/', N'/ˈprɒdʌkt laɪn/', N'noun', N'Dòng sản phẩm', N'The company has expanded its product line to include skincare items.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Service provider')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Service provider', N'/ˈsɜːvɪs prəˈvaɪdə(r)/', N'/ˈsɜːvɪs prəˈvaɪdə(r)/', N'noun', N'Nhà cung cấp dịch vụ', N'The service provider ensures all services are delivered on time.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Online shopping')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Online shopping', N'/ˈɒn.laɪn ˈʃɒpɪŋ/', N'/ˈɒn.laɪn ˈʃɒpɪŋ/', N'noun', N'Mua sắm trực tuyến', N'Online shopping has grown significantly in the last few years.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_42 AND Word = N'Customer satisfaction')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_42, N'Customer satisfaction', N'/ˈkʌstəmər ˌsætɪsˈfækʃən/', N'/ˈkʌstəmər ˌsætɪsˈfækʃən/', N'noun', N'Sự hài lòng của khách hàng', N'The company is focused on improving customer satisfaction.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_42 AND Prompt = N'Từ "Return policy" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_42, N'Từ "Return policy" có nghĩa là gì?', NULL, N'["Tùy chỉnh", "Chính sách hoàn trả", "Thương hiệu", "Khuyến mãi"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_42 AND Prompt = N'Từ "Quality" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_42, N'Từ "Quality" có nghĩa là gì?', NULL, N'["Chất lượng", "Dịch vụ hậu mãi", "Khách hàng", "Dịch vụ"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_42 AND Prompt = N'Từ "Price" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_42, N'Từ "Price" có nghĩa là gì?', NULL, N'["Khách hàng", "Giá", "Khuyến mãi", "Tính năng"]', 1);

-- Chủ đề 43: Quan hệ đối tác (Partnerships) (25 từ)
DECLARE @LessonId_43 INT;
SELECT @LessonId_43 = Id FROM dbo.Lessons WHERE Title = N'Quan hệ đối tác (Partnerships)' AND LanguageCode = 'en';
IF @LessonId_43 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Quan hệ đối tác (Partnerships)', 'en', 'TOEIC 800', 45, 3, 3);
    SET @LessonId_43 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Partnership')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Partnership', N'/ˈpɑːt.nə.ʃɪp/', N'/ˈpɑːt.nə.ʃɪp/', N'noun', N'Quan hệ đối tác', N'The company entered into a partnership with a leading tech firm.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Collaborate')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Collaborate', N'/kəˈlæb.ə.reɪt/', N'/kəˈlæb.ə.reɪt/', N'verb', N'Hợp tác', N'The two companies will collaborate on a new product line.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Alliance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Alliance', N'/əˈlaɪ.əns/', N'/əˈlaɪ.əns/', N'noun', N'Liên minh', N'The business alliance aims to expand into international markets.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Joint venture')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Joint venture', N'/dʒɔɪnt ˈvɛn.tʃər/', N'/dʒɔɪnt ˈvɛn.tʃər/', N'noun', N'Liên doanh', N'They launched a joint venture to develop new software.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Stakeholder')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Stakeholder', N'/ˈsteɪkˌhəʊl.dər/', N'/ˈsteɪkˌhəʊl.dər/', N'noun', N'Bên liên quan', N'All stakeholders were informed about the project’s progress.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Synergy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Synergy', N'/ˈsɪn.ə.dʒi/', N'/ˈsɪn.ə.dʒi/', N'noun', N'Hiệu quả hợp tác', N'The synergy between the two companies led to greater innovation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Collaboration')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Collaboration', N'/kəˌlæb.əˈreɪ.ʃən/', N'/kəˌlæb.əˈreɪ.ʃən/', N'noun', N'Sự hợp tác', N'Successful collaboration can lead to mutual benefits.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Co-branding')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Co-branding', N'/kəʊ ˈbrændɪŋ/', N'/kəʊ ˈbrændɪŋ/', N'noun', N'Đồng thương hiệu', N'The companies are engaging in co-branding to boost product recognition.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Contractual')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Contractual', N'/kənˈtræk.tjʊəl/', N'/kənˈtræk.tjʊəl/', N'adjective', N'Liên quan hợp đồng', N'The two firms have a contractual agreement to share profits.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Partnership agreement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Partnership agreement', N'/ˈpɑːt.nə.ʃɪp əˈɡriː.mənt/', N'/ˈpɑːt.nə.ʃɪp əˈɡriː.mənt/', N'noun', N'Hợp đồng hợp tác', N'The partnership agreement outlines the roles and responsibilities of each partner.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Business partner')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Business partner', N'/ˈbɪz.nɪs ˈpɑːt.nər/', N'/ˈbɪz.nɪs ˈpɑːt.nər/', N'noun', N'Đối tác kinh doanh', N'The business partners met to discuss the next steps in their venture.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Equity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Equity', N'/ˈekwɪti/', N'/ˈekwɪti/', N'noun', N'Vốn chủ sở hữu', N'The company offered equity to the investors in exchange for funding.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Shareholder')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Shareholder', N'/ˈʃɛə.həʊldər/', N'/ˈʃɛə.həʊldər/', N'noun', N'Cổ đông', N'The shareholders voted to approve the merger.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Investor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Investor', N'/ɪnˈvɛstər/', N'/ɪnˈvɛstər/', N'noun', N'Nhà đầu tư', N'The company attracted several investors to fund the expansion.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Network')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Network', N'/ˈnɛtwɜːk/', N'/ˈnɛtwɜːk/', N'noun', N'Mạng lưới', N'The companies expanded their network by partnering with local firms.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Co-operation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Co-operation', N'/ˌkəʊˌɒpəˈreɪʃən/', N'/ˌkəʊˌɒpəˈreɪʃən/', N'noun', N'Sự hợp tác, phối hợp', N'Co-operation between departments improved overall efficiency.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Strategic partner')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Strategic partner', N'/strəˈtiːdʒɪk ˈpɑːtnə/', N'/strəˈtiːdʒɪk ˈpɑːtnə/', N'noun', N'Đối tác chiến lược', N'The strategic partner helped open up new markets for the business.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Profit-sharing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Profit-sharing', N'/ˈprɒfɪt ˌʃeərɪŋ/', N'/ˈprɒfɪt ˌʃeərɪŋ/', N'noun', N'Chia sẻ lợi nhuận', N'The profit-sharing plan ensures both parties benefit from the partnership.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Exclusive partnership')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Exclusive partnership', N'/ɪkˈskluːsɪv ˈpɑːtnəʃɪp/', N'/ɪkˈskluːsɪv ˈpɑːtnəʃɪp/', N'noun', N'Quan hệ đối tác độc quyền', N'The company entered into an exclusive partnership with a supplier.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Due diligence')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Due diligence', N'/djuː ˈdɪlɪdʒəns/', N'/djuː ˈdɪlɪdʒəns/', N'noun', N'Thẩm định', N'Before finalizing the deal, they conducted a thorough due diligence process.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Growth opportunity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Growth opportunity', N'/ɡrəʊθ ˌɒpəˈtjuːnəti/', N'/ɡrəʊθ ˌɒpəˈtjuːnəti/', N'noun', N'Cơ hội phát triển', N'The new growth opportunity offered by the partnership is promising.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Risk management')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Risk management', N'/rɪsk ˈmænɪdʒ.mənt/', N'/rɪsk ˈmænɪdʒ.mənt/', N'noun', N'Quản lý rủi ro', N'Effective risk management strategies are critical to partnership success.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Liability')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Liability', N'/ˌlaɪəˈbɪləti/', N'/ˌlaɪəˈbɪləti/', N'noun', N'Trách nhiệm pháp lý', N'The liability for any losses is shared equally between the partners.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Integration')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Integration', N'/ˌɪn.tɪˈɡreɪ.ʃən/', N'/ˌɪn.tɪˈɡreɪ.ʃən/', N'noun', N'Sự hội nhập', N'The integration of services between the two companies has been smooth.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_43 AND Word = N'Contribution')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_43, N'Contribution', N'/ˌkɒn.trɪˈbjuː.ʃən/', N'/ˌkɒn.trɪˈbjuː.ʃən/', N'noun', N'Sự đóng góp', N'Both companies made significant contributions to the project.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_43 AND Prompt = N'Từ "Alliance" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_43, N'Từ "Alliance" có nghĩa là gì?', NULL, N'["Hợp đồng hợp tác", "Liên minh", "Trách nhiệm pháp lý", "Liên quan hợp đồng"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_43 AND Prompt = N'Từ "Strategic partner" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_43, N'Từ "Strategic partner" có nghĩa là gì?', NULL, N'["Thẩm định", "Trách nhiệm pháp lý", "Quản lý rủi ro", "Đối tác chiến lược"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_43 AND Prompt = N'Từ "Contractual" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_43, N'Từ "Contractual" có nghĩa là gì?', NULL, N'["Cơ hội phát triển", "Nhà đầu tư", "Chia sẻ lợi nhuận", "Liên quan hợp đồng"]', 3);

-- Chủ đề 44: Quản lý thời gian (Time Management) (24 từ)
DECLARE @LessonId_44 INT;
SELECT @LessonId_44 = Id FROM dbo.Lessons WHERE Title = N'Quản lý thời gian (Time Management)' AND LanguageCode = 'en';
IF @LessonId_44 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Quản lý thời gian (Time Management)', 'en', 'TOEIC 800', 46, 3, 3);
    SET @LessonId_44 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Time management')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Time management', N'/taɪm ˈmænɪdʒ.mənt/', N'/taɪm ˈmænɪdʒ.mənt/', N'noun', N'Quản lý thời gian', N'Effective time management helps increase productivity.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Deadline')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Deadline', N'/ˈded.laɪn/', N'/ˈded.laɪn/', N'noun', N'Hạn chót', N'The project has a deadline of next Friday.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Prioritize')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Prioritize', N'/ˈpraɪ.ɒr.aɪzeɪt/', N'/ˈpraɪ.ɒr.aɪzeɪt/', N'verb', N'Ưu tiên', N'It’s important to prioritize tasks to meet deadlines.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Schedule')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Schedule', N'/ˈʃedjuːl/ or /ˈskedʒ.uːl/', N'/ˈʃedjuːl/ or /ˈskedʒ.uːl/', N'noun', N'Lịch trình', N'I have a busy schedule this week with meetings and deadlines.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Time allocation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Time allocation', N'/taɪm ˌæl.əˈkeɪ.ʃən/', N'/taɪm ˌæl.əˈkeɪ.ʃən/', N'noun', N'Phân bổ thời gian', N'Proper time allocation ensures all tasks are completed on time.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Efficiency')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Efficiency', N'/ɪˈfɪʃ.ən.si/', N'/ɪˈfɪʃ.ən.si/', N'noun', N'Hiệu quả', N'The new software improved efficiency in managing tasks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Productivity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Productivity', N'/prəˈdʌk.tɪ.vɪ.ti/', N'/prəˈdʌk.tɪ.vɪ.ti/', N'noun', N'Năng suất', N'Time management directly influences productivity in the workplace.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Time frame')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Time frame', N'/taɪm freɪm/', N'/taɪm freɪm/', N'noun', N'Khung thời gian', N'The project is expected to be completed within a two-week time frame.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Planner')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Planner', N'/ˈplænər/', N'/ˈplænər/', N'noun', N'Người lập kế hoạch, sổ kế hoạch', N'Use a planner to keep track of your daily tasks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'To-do list')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'To-do list', N'/tuː dʊ lɪst/', N'/tuː dʊ lɪst/', N'noun', N'Danh sách việc cần làm', N'I write a to-do list every morning to stay organized.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Postpone')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Postpone', N'/pəʊs(t)ˈpəʊn/', N'/pəʊs(t)ˈpəʊn/', N'noun', N'Hoãn lại', N'We had to postpone the meeting until next week.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Delegate')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Delegate', N'/ˈdelɪɡeɪt/', N'/ˈdelɪɡeɪt/', N'verb', N'Giao nhiệm vụ', N'As a manager, it’s important to delegate tasks to others effectively.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Time blocking')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Time blocking', N'/taɪm ˈblɒkɪŋ/', N'/taɪm ˈblɒkɪŋ/', N'noun', N'Chia khung thời gian', N'Time blocking is a technique used to allocate specific times for tasks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Time tracking')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Time tracking', N'/taɪm ˈtrækɪŋ/', N'/taɪm ˈtrækɪŋ/', N'noun', N'Theo dõi thời gian', N'Using an app for time tracking helps identify where time is spent.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Multitasking')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Multitasking', N'/ˈmʌl.tɪˌtɑːskɪŋ/', N'/ˈmʌl.tɪˌtɑːskɪŋ/', N'noun', N'Làm nhiều việc cùng lúc', N'Multitasking can decrease efficiency if not done properly.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Focus')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Focus', N'/ˈfəʊ.kəs/', N'/ˈfəʊ.kəs/', N'noun', N'Sự tập trung', N'Focus is crucial to completing tasks efficiently.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Time-sensitive')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Time-sensitive', N'/ˈtaɪm ˌsen.sɪ.tɪv/', N'/ˈtaɪm ˌsen.sɪ.tɪv/', N'adjective', N'Yêu cầu hoàn thành trong thời gian nhất định', N'The report is time-sensitive and must be submitted by tomorrow.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Procrastination')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Procrastination', N'/prəˌkræstɪˈneɪʃən/', N'/prəˌkræstɪˈneɪʃən/', N'noun', N'Sự trì hoãn', N'Procrastination can lead to missing deadlines and falling behind.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Time-consuming')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Time-consuming', N'/ˈtaɪm kənˌsjuːmɪŋ/', N'/ˈtaɪm kənˌsjuːmɪŋ/', N'noun', N'Tốn thời gian', N'Writing reports can be very time-consuming.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Set a reminder')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Set a reminder', N'/set ə rɪˈmaɪndər/', N'/set ə rɪˈmaɪndər/', N'noun', N'Đặt lời nhắc', N'I will set a reminder to follow up on the task later.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Time management skills')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Time management skills', N'/taɪm ˈmænɪdʒ.mənt skɪlz/', N'/taɪm ˈmænɪdʒ.mənt skɪlz/', N'noun', N'Kỹ năng quản lý thời gian', N'Time management skills are essential for balancing work and personal life.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Work-life balance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Work-life balance', N'/wɜːk laɪf ˈbæləns/', N'/wɜːk laɪf ˈbæləns/', N'noun', N'Cân bằng công việc và cuộc sống', N'Work-life balance helps prevent burnout and improves productivity.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Streamline')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Streamline', N'/ˈstriːm.laɪn/', N'/ˈstriːm.laɪn/', N'noun', N'Tinh giản, tối ưu hóa', N'We need to streamline the process to save time.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_44 AND Word = N'Calendar')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_44, N'Calendar', N'/ˈkælɪndər/', N'/ˈkælɪndər/', N'noun', N'Lịch', N'I marked the important deadlines on my calendar to stay on track.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_44 AND Prompt = N'Từ "Focus" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_44, N'Từ "Focus" có nghĩa là gì?', NULL, N'["Ưu tiên", "Chia khung thời gian", "Theo dõi thời gian", "Sự tập trung"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_44 AND Prompt = N'Từ "Deadline" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_44, N'Từ "Deadline" có nghĩa là gì?', NULL, N'["Kỹ năng quản lý thời gian", "Hạn chót", "Tốn thời gian", "Danh sách việc cần làm"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_44 AND Prompt = N'Từ "Time tracking" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_44, N'Từ "Time tracking" có nghĩa là gì?', NULL, N'["Theo dõi thời gian", "Kỹ năng quản lý thời gian", "Khung thời gian", "Đặt lời nhắc"]', 0);

-- Chủ đề 45: Bảo trì thiết bị (Equipment Maintenance) (27 từ)
DECLARE @LessonId_45 INT;
SELECT @LessonId_45 = Id FROM dbo.Lessons WHERE Title = N'Bảo trì thiết bị (Equipment Maintenance)' AND LanguageCode = 'en';
IF @LessonId_45 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Bảo trì thiết bị (Equipment Maintenance)', 'en', 'TOEIC 800', 47, 3, 3);
    SET @LessonId_45 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Maintenance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Maintenance', N'/meɪnˈteɪnəns/', N'/meɪnˈteɪnəns/', N'noun', N'Bảo trì, duy trì', N'Regular maintenance is essential to keep machinery running smoothly.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Repair')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Repair', N'/rɪˈpeə(r)/', N'/rɪˈpeə(r)/', N'noun', N'Sửa chữa', N'The technician was called to repair the broken equipment.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Inspection')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Inspection', N'/ɪnˈspekʃən/', N'/ɪnˈspekʃən/', N'noun', N'Kiểm tra, thanh tra', N'The equipment undergoes a thorough inspection every six months.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Service')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Service', N'/ˈsɜːvɪs/', N'/ˈsɜːvɪs/', N'noun', N'Dịch vụ, bảo dưỡng', N'Service is required to keep the machines in top condition.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Breakdown')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Breakdown', N'/ˈbreɪk.daʊn/', N'/ˈbreɪk.daʊn/', N'noun', N'Sự hỏng, sự cố', N'The breakdown of the factory’s machinery caused a significant delay.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Preventive maintenance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Preventive maintenance', N'/prɪˈventɪv ˈmeɪnˌteɪnəns/', N'/prɪˈventɪv ˈmeɪnˌteɪnəns/', N'noun', N'Bảo trì phòng ngừa', N'Preventive maintenance helps avoid unexpected equipment failures.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Downtime')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Downtime', N'/ˈdaʊn.taɪm/', N'/ˈdaʊn.taɪm/', N'noun', N'Thời gian ngừng hoạt động', N'Downtime can be costly for manufacturing businesses.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Calibration')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Calibration', N'/ˌkælɪˈbreɪʃən/', N'/ˌkælɪˈbreɪʃən/', N'noun', N'Hiệu chuẩn', N'The calibration of the machines is done annually to ensure accuracy.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Troubleshooting')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Troubleshooting', N'/ˈtrʌbəlˌʃuːtɪŋ/', N'/ˈtrʌbəlˌʃuːtɪŋ/', N'noun', N'Sửa chữa sự cố', N'The technician is skilled in troubleshooting complex mechanical issues.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Replacement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Replacement', N'/rɪˈpleɪsmənt/', N'/rɪˈpleɪsmənt/', N'noun', N'Sự thay thế', N'The replacement of old parts is necessary for the equipment’s longevity.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Spare parts')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Spare parts', N'/ˈspɛə ˈpɑːts/', N'/ˈspɛə ˈpɑːts/', N'noun', N'Phụ tùng thay thế', N'Keep a stock of spare parts to avoid delays during repairs.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Servicing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Servicing', N'/ˈsɜːvɪsɪŋ/', N'/ˈsɜːvɪsɪŋ/', N'noun', N'Dịch vụ bảo trì', N'Servicing the machinery is a routine task every quarter.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Wear and tear')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Wear and tear', N'/weə(r) ənd teə(r)/', N'/weə(r) ənd teə(r)/', N'noun', N'Mòn và hư hỏng', N'Wear and tear is inevitable after years of use, requiring regular checks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Lubrication')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Lubrication', N'/ˌluː.brɪˈkeɪʃən/', N'/ˌluː.brɪˈkeɪʃən/', N'noun', N'Bôi trơn', N'Lubrication is important to reduce friction and prevent overheating.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Efficiency')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Efficiency', N'/ɪˈfɪʃənsi/', N'/ɪˈfɪʃənsi/', N'noun', N'Hiệu suất', N'Efficiency can be improved by maintaining equipment in good condition.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Manual')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Manual', N'/ˈmænjuəl/', N'/ˈmænjuəl/', N'adjective', N'Hướng dẫn sử dụng', N'Refer to the manual for instructions on how to perform basic maintenance.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Operator')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Operator', N'/ˈɒpəreɪtə(r)/', N'/ˈɒpəreɪtə(r)/', N'noun', N'Người vận hành', N'The operator should check the machinery for signs of malfunction.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Inspection checklist')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Inspection checklist', N'/ɪnˈspekʃən ˈʧɛkˌlɪst/', N'/ɪnˈspekʃən ˈʧɛkˌlɪst/', N'noun', N'Danh sách kiểm tra', N'Use an inspection checklist to ensure all components are functioning properly.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Systematic approach')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Systematic approach', N'/ˌsɪstəˈmætɪk əˈprəʊtʃ/', N'/ˌsɪstəˈmætɪk əˈprəʊtʃ/', N'noun', N'Phương pháp có hệ thống', N'A systematic approach to equipment maintenance reduces the risk of breakdowns.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Maintenance schedule')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Maintenance schedule', N'/ˈmeɪnˈteɪnəns ˈʃedjuːl/', N'/ˈmeɪnˈteɪnəns ˈʃedjuːl/', N'noun', N'Lịch bảo trì', N'The maintenance schedule should be followed to avoid equipment failure.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Operational efficiency')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Operational efficiency', N'/ˌɒpəˈreɪʃənəl ɪˈfɪʃənsi/', N'/ˌɒpəˈreɪʃənəl ɪˈfɪʃənsi/', N'noun', N'Hiệu quả vận hành', N'Regular maintenance increases the operational efficiency of machinery.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Condition monitoring')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Condition monitoring', N'/kənˈdɪʃən ˈmɒnɪtərɪŋ/', N'/kənˈdɪʃən ˈmɒnɪtərɪŋ/', N'noun', N'Giám sát tình trạng thiết bị', N'Condition monitoring helps detect issues before they become serious problems.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Overhaul')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Overhaul', N'/ˈəʊ.və.hɔːl/', N'/ˈəʊ.və.hɔːl/', N'noun', N'Đại tu, sửa chữa tổng thể', N'The equipment underwent a complete overhaul after 10 years of use.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Emergency repair')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Emergency repair', N'/ɪˈmɜːdʒənsi rɪˈpeə(r)/', N'/ɪˈmɜːdʒənsi rɪˈpeə(r)/', N'noun', N'Sửa chữa khẩn cấp', N'The team was called in for an emergency repair when the machinery broke down.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Service contract')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Service contract', N'/ˈsɜːvɪs ˈkɒntrækt/', N'/ˈsɜːvɪs ˈkɒntrækt/', N'noun', N'Hợp đồng bảo trì', N'The company signed a service contract to ensure timely maintenance.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Inspection report')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Inspection report', N'/ɪnˈspekʃən rɪˈpɔːt/', N'/ɪnˈspekʃən rɪˈpɔːt/', N'noun', N'Báo cáo kiểm tra', N'The inspection report showed several issues with the equipment.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_45 AND Word = N'Operational downtime')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_45, N'Operational downtime', N'/ˌɒpəˈreɪʃənəl ˈdaʊn.taɪm/', N'/ˌɒpəˈreɪʃənəl ˈdaʊn.taɪm/', N'noun', N'Thời gian ngừng hoạt động', N'Reducing operational downtime is critical to maximizing productivity.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_45 AND Prompt = N'Từ "Wear and tear" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_45, N'Từ "Wear and tear" có nghĩa là gì?', NULL, N'["Hợp đồng bảo trì", "Phụ tùng thay thế", "Mòn và hư hỏng", "Hiệu chuẩn"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_45 AND Prompt = N'Từ "Operator" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_45, N'Từ "Operator" có nghĩa là gì?', NULL, N'["Hiệu suất", "Bảo trì phòng ngừa", "Người vận hành", "Bôi trơn"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_45 AND Prompt = N'Từ "Preventive maintenance" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_45, N'Từ "Preventive maintenance" có nghĩa là gì?', NULL, N'["Bảo trì, duy trì", "Bảo trì phòng ngừa", "Giám sát tình trạng thiết bị", "Danh sách kiểm tra"]', 1);

-- Chủ đề 46: Xuất nhập khẩu (Import & Export) (27 từ)
DECLARE @LessonId_46 INT;
SELECT @LessonId_46 = Id FROM dbo.Lessons WHERE Title = N'Xuất nhập khẩu (Import & Export)' AND LanguageCode = 'en';
IF @LessonId_46 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Xuất nhập khẩu (Import & Export)', 'en', 'TOEIC 800', 48, 3, 3);
    SET @LessonId_46 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Import')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Import', N'/ˈɪmpɔːt/', N'/ˈɪmpɔːt/', N'noun', N'Nhập khẩu', N'The company decided to import raw materials from overseas.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Export')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Export', N'/ˈɛkspɔːt/', N'/ˈɛkspɔːt/', N'noun', N'Xuất khẩu', N'The company is looking to export its products to new markets.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Customs')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Customs', N'/ˈkʌstəmz/', N'/ˈkʌstəmz/', N'noun', N'Hải quan', N'All shipments must pass through customs before entering the country.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Tariff')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Tariff', N'/ˈtærɪf/', N'/ˈtærɪf/', N'noun', N'Thuế xuất nhập khẩu', N'The government has increased the tariff on imported goods.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Freight')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Freight', N'/freɪt/', N'/freɪt/', N'noun', N'Hàng hóa (vận tải)', N'Freight charges are based on the weight and size of the cargo.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Bill of lading')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Bill of lading', N'/bɪl ɒv ˈleɪdɪŋ/', N'/bɪl ɒv ˈleɪdɪŋ/', N'noun', N'Vận đơn', N'The bill of lading confirms the shipment of goods from the seller.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Shipment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Shipment', N'/ˈʃɪpmənt/', N'/ˈʃɪpmənt/', N'noun', N'Lô hàng, sự vận chuyển', N'The shipment arrived on time despite bad weather.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Importer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Importer', N'/ˈɪmpɔːtə(r)/', N'/ˈɪmpɔːtə(r)/', N'noun', N'Người nhập khẩu', N'The importer must pay all customs duties before receiving the goods.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Exporter')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Exporter', N'/ɪksˈpɔːtə(r)/', N'/ɪksˈpɔːtə(r)/', N'noun', N'Người xuất khẩu', N'The exporter ensures the goods are packaged according to international standards.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'International trade')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'International trade', N'/ˌɪntəˈnæʃənl treɪd/', N'/ˌɪntəˈnæʃənl treɪd/', N'noun', N'Thương mại quốc tế', N'International trade has been growing due to advances in logistics.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Customs clearance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Customs clearance', N'/ˈkʌstəmz ˈklɪərəns/', N'/ˈkʌstəmz ˈklɪərəns/', N'noun', N'Thủ tục hải quan', N'Customs clearance can take several days depending on the cargo.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Free trade')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Free trade', N'/friː treɪd/', N'/friː treɪd/', N'noun', N'Thương mại tự do', N'Free trade agreements help eliminate tariffs between countries.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Quota')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Quota', N'/ˈkwəʊtə/', N'/ˈkwəʊtə/', N'noun', N'Hạn ngạch', N'The government has set a quota on the import of agricultural products.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Shipping terms')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Shipping terms', N'/ˈʃɪpɪŋ tɜːmz/', N'/ˈʃɪpɪŋ tɜːmz/', N'noun', N'Điều kiện vận chuyển', N'Shipping terms such as FOB and CIF are commonly used in contracts.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Duty')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Duty', N'/ˈdjuːti/', N'/ˈdjuːti/', N'noun', N'Thuế', N'The duty on imported electronics is higher than on other goods.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Trade agreement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Trade agreement', N'/treɪd əˈɡriːmənt/', N'/treɪd əˈɡriːmənt/', N'noun', N'Hiệp định thương mại', N'The trade agreement has been revised to include new tariffs and quotas.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Import license')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Import license', N'/ˈɪmpɔːt ˈlaɪsəns/', N'/ˈɪmpɔːt ˈlaɪsəns/', N'noun', N'Giấy phép nhập khẩu', N'You need an import license to bring certain products into the country.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Export license')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Export license', N'/ˈɛkspɔːt ˈlaɪsəns/', N'/ˈɛkspɔːt ˈlaɪsəns/', N'noun', N'Giấy phép xuất khẩu', N'The company applied for an export license to ship its products abroad.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Customs duties')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Customs duties', N'/ˈkʌstəmz ˈdjuːti/', N'/ˈkʌstəmz ˈdjuːti/', N'noun', N'Thuế hải quan', N'Customs duties must be paid before the goods are released.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Shipping cost')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Shipping cost', N'/ˈʃɪpɪŋ kɒst/', N'/ˈʃɪpɪŋ kɒst/', N'noun', N'Chi phí vận chuyển', N'The shipping cost for large items can be very high.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Import tariff')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Import tariff', N'/ˈɪmpɔːt ˈtærɪf/', N'/ˈɪmpɔːt ˈtærɪf/', N'noun', N'Thuế nhập khẩu', N'The import tariff on luxury goods was reduced last year.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Export documentation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Export documentation', N'/ˈɛkspɔːt ˌdɒkjʊˈmɛntəreɪʃən/', N'/ˈɛkspɔːt ˌdɒkjʊˈmɛntəreɪʃən/', N'noun', N'Tài liệu xuất khẩu', N'Export documentation includes invoices, bills of lading, and certificates of origin.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Container')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Container', N'/kənˈteɪnə(r)/', N'/kənˈteɪnə(r)/', N'noun', N'Container, thùng chứa', N'The goods were packed into a 40-foot container for shipping.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Airfreight')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Airfreight', N'/ˈeəˌfreɪt/', N'/ˈeəˌfreɪt/', N'noun', N'Vận chuyển hàng không', N'Airfreight is the fastest option for international shipping.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Seaport')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Seaport', N'/ˈsiːpɔːt/', N'/ˈsiːpɔːt/', N'noun', N'Cảng biển', N'The seaport handled thousands of containers every day.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Export customs')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Export customs', N'/ˈɛkspɔːt ˈkʌstəmz/', N'/ˈɛkspɔːt ˈkʌstəmz/', N'noun', N'Hải quan xuất khẩu', N'The export customs process ensures the goods meet all requirements.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_46 AND Word = N'Port of entry')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_46, N'Port of entry', N'/pɔːt ɒv ˈɛn.tri/', N'/pɔːt ɒv ˈɛn.tri/', N'noun', N'Cảng nhập khẩu', N'The port of entry is where the goods are first unloaded.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_46 AND Prompt = N'Từ "Customs clearance" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_46, N'Từ "Customs clearance" có nghĩa là gì?', NULL, N'["Thủ tục hải quan", "Cảng biển", "Thuế", "Thuế hải quan"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_46 AND Prompt = N'Từ "Export" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_46, N'Từ "Export" có nghĩa là gì?', NULL, N'["Xuất khẩu", "Cảng biển", "Thủ tục hải quan", "Thương mại tự do"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_46 AND Prompt = N'Từ "Shipping cost" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_46, N'Từ "Shipping cost" có nghĩa là gì?', NULL, N'["Cảng nhập khẩu", "Hiệp định thương mại", "Hải quan", "Chi phí vận chuyển"]', 3);

-- Chủ đề 47: Phát triển sản phẩm (Product Development) (27 từ)
DECLARE @LessonId_47 INT;
SELECT @LessonId_47 = Id FROM dbo.Lessons WHERE Title = N'Phát triển sản phẩm (Product Development)' AND LanguageCode = 'en';
IF @LessonId_47 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Phát triển sản phẩm (Product Development)', 'en', 'TOEIC 800', 49, 3, 3);
    SET @LessonId_47 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Product development')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Product development', N'/ˈprɒdʌkt dɪˈvɛləpmənt/', N'/ˈprɒdʌkt dɪˈvɛləpmənt/', N'noun', N'Phát triển sản phẩm', N'Product development is essential to maintaining competitiveness in the market.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Prototype')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Prototype', N'/ˈprəʊtətaɪp/', N'/ˈprəʊtətaɪp/', N'noun', N'Mẫu thử, nguyên mẫu', N'The engineers are testing the prototype before starting full production.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Innovation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Innovation', N'/ˌɪnəˈveɪʃən/', N'/ˌɪnəˈveɪʃən/', N'noun', N'Sự đổi mới, sáng tạo', N'Innovation is key to staying ahead of competitors in the tech industry.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Research and development')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Research and development', N'/rɪˈsɜːʧ ənd dɪˈvɛləpmənt/', N'/rɪˈsɜːʧ ənd dɪˈvɛləpmənt/', N'noun', N'Nghiên cứu và phát triển', N'The company invests heavily in research and development for new products.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Design')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Design', N'/dɪˈzaɪn/', N'/dɪˈzaɪn/', N'noun', N'Thiết kế', N'The design of the new product includes both functionality and style.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Testing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Testing', N'/ˈtɛstɪŋ/', N'/ˈtɛstɪŋ/', N'noun', N'Kiểm tra', N'The product underwent several rounds of testing to ensure quality.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Features')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Features', N'/ˈfiːtʃərz/', N'/ˈfiːtʃərz/', N'noun', N'Tính năng', N'The new phone has many innovative features that attract customers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Market research')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Market research', N'/ˈmɑːkɪt rɪˈsɜːʧ/', N'/ˈmɑːkɪt rɪˈsɜːʧ/', N'noun', N'Nghiên cứu thị trường', N'Market research helps understand customer preferences and demands.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Product launch')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Product launch', N'/ˈprɒdʌkt lɔːntʃ/', N'/ˈprɒdʌkt lɔːntʃ/', N'noun', N'Ra mắt sản phẩm', N'The product launch event was a huge success, attracting thousands of customers.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Feasibility study')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Feasibility study', N'/ˌfiːzəˈbɪləti ˈstʌdi/', N'/ˌfiːzəˈbɪləti ˈstʌdi/', N'noun', N'Nghiên cứu tính khả thi', N'The feasibility study showed that the product could be developed within budget.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Prototype testing')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Prototype testing', N'/ˈprəʊtətaɪp ˈtɛstɪŋ/', N'/ˈprəʊtətaɪp ˈtɛstɪŋ/', N'noun', N'Kiểm tra mẫu thử', N'Prototype testing is done to detect any flaws before mass production.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Development cycle')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Development cycle', N'/dɪˈvɛləpmənt ˈsaɪkəl/', N'/dɪˈvɛləpmənt ˈsaɪkəl/', N'noun', N'Chu kỳ phát triển', N'The development cycle includes concept design, testing, and final production.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Collaboration')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Collaboration', N'/kəˌlæbəˈreɪʃən/', N'/kəˌlæbəˈreɪʃən/', N'noun', N'Sự hợp tác', N'Collaboration between departments is crucial for successful product development.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Production')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Production', N'/prəˈdʌkʃən/', N'/prəˈdʌkʃən/', N'noun', N'Sản xuất', N'The production phase starts after the product has passed all quality checks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Quality control')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Quality control', N'/ˈkwɒləti kənˈtrəʊl/', N'/ˈkwɒləti kənˈtrəʊl/', N'noun', N'Kiểm soát chất lượng', N'Quality control ensures that every product meets company standards.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Branding')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Branding', N'/ˈbrændɪŋ/', N'/ˈbrændɪŋ/', N'noun', N'Xây dựng thương hiệu', N'The branding of the product plays a vital role in consumer attraction.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Product design')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Product design', N'/ˈprɒdʌkt dɪˈzaɪn/', N'/ˈprɒdʌkt dɪˈzaɪn/', N'noun', N'Thiết kế sản phẩm', N'Product design is not only about appearance but also user experience.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Idea generation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Idea generation', N'/ˈaɪdɪə dʒɛnəˈreɪʃən/', N'/ˈaɪdɪə dʒɛnəˈreɪʃən/', N'noun', N'Tạo ra ý tưởng', N'Idea generation sessions help to come up with innovative product concepts.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Consumer feedback')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Consumer feedback', N'/kənˈsjuːmər ˈfiːdbæk/', N'/kənˈsjuːmər ˈfiːdbæk/', N'noun', N'Phản hồi của khách hàng', N'The development team incorporates consumer feedback to improve the product.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Prototype development')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Prototype development', N'/ˈprəʊtətaɪp dɪˈvɛləpmənt/', N'/ˈprəʊtətaɪp dɪˈvɛləpmənt/', N'noun', N'Phát triển mẫu thử', N'After several iterations, the prototype development was completed.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Design team')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Design team', N'/dɪˈzaɪn tiːm/', N'/dɪˈzaɪn tiːm/', N'noun', N'Đội ngũ thiết kế', N'The design team is responsible for the initial concept of the product.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Product improvement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Product improvement', N'/ˈprɒdʌkt ɪmˈpruːvmənt/', N'/ˈprɒdʌkt ɪmˈpruːvmənt/', N'noun', N'Cải tiến sản phẩm', N'The company focuses on product improvement through continuous innovation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Testing phase')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Testing phase', N'/ˈtɛstɪŋ feɪz/', N'/ˈtɛstɪŋ feɪz/', N'noun', N'Giai đoạn kiểm tra', N'The product is in the testing phase, with adjustments being made.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Product cycle')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Product cycle', N'/ˈprɒdʌkt ˈsaɪkəl/', N'/ˈprɒdʌkt ˈsaɪkəl/', N'noun', N'Chu kỳ sản phẩm', N'The product cycle includes development, marketing, and after-sales support.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Customer satisfaction')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Customer satisfaction', N'/ˈkʌstəmər ˌsætɪsˈfækʃən/', N'/ˈkʌstəmər ˌsætɪsˈfækʃən/', N'noun', N'Sự hài lòng của khách hàng', N'Ensuring customer satisfaction is a key part of product development.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Scalability')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Scalability', N'/ˌskeɪləˈbɪləti/', N'/ˌskeɪləˈbɪləti/', N'noun', N'Khả năng mở rộng', N'The product’s scalability allows it to be used in different markets.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_47 AND Word = N'Iteration')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_47, N'Iteration', N'/ˌɪtəˈreɪʃən/', N'/ˌɪtəˈreɪʃən/', N'noun', N'Sự lặp lại', N'The development process involved multiple iterations before final approval.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_47 AND Prompt = N'Từ "Product development" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_47, N'Từ "Product development" có nghĩa là gì?', NULL, N'["Kiểm tra", "Tính năng", "Thiết kế sản phẩm", "Phát triển sản phẩm"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_47 AND Prompt = N'Từ "Consumer feedback" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_47, N'Từ "Consumer feedback" có nghĩa là gì?', NULL, N'["Phát triển mẫu thử", "Tính năng", "Phản hồi của khách hàng", "Giai đoạn kiểm tra"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_47 AND Prompt = N'Từ "Iteration" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_47, N'Từ "Iteration" có nghĩa là gì?', NULL, N'["Sự lặp lại", "Giai đoạn kiểm tra", "Phản hồi của khách hàng", "Thiết kế"]', 0);

-- Chủ đề 48: Khủng hoảng và quản lý rủi ro (Crisis & Risk Management) (27 từ)
DECLARE @LessonId_48 INT;
SELECT @LessonId_48 = Id FROM dbo.Lessons WHERE Title = N'Khủng hoảng và quản lý rủi ro (Crisis & Risk Management)' AND LanguageCode = 'en';
IF @LessonId_48 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Khủng hoảng và quản lý rủi ro (Crisis & Risk Management)', 'en', 'TOEIC 800', 50, 3, 3);
    SET @LessonId_48 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Crisis')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Crisis', N'/ˈkraɪsɪs/', N'/ˈkraɪsɪs/', N'noun', N'Khủng hoảng', N'The company is facing a crisis due to a major product recall.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Risk management')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Risk management', N'/rɪsk ˈmænɪdʒmənt/', N'/rɪsk ˈmænɪdʒmənt/', N'noun', N'Quản lý rủi ro', N'Risk management strategies are crucial to minimize potential losses.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Contingency plan')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Contingency plan', N'/kənˈtɪndʒənsi plæn/', N'/kənˈtɪndʒənsi plæn/', N'noun', N'Kế hoạch dự phòng', N'The company developed a contingency plan to handle natural disasters.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Emergency response')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Emergency response', N'/ɪˈmɜːdʒənsi rɪˈspɒns/', N'/ɪˈmɜːdʒənsi rɪˈspɒns/', N'noun', N'Phản ứng khẩn cấp', N'The emergency response team acted quickly to contain the situation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Crisis management')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Crisis management', N'/ˈkraɪsɪs ˈmænɪdʒmənt/', N'/ˈkraɪsɪs ˈmænɪdʒmənt/', N'noun', N'Quản lý khủng hoảng', N'Crisis management involves quick decision-making to mitigate damage.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Risk assessment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Risk assessment', N'/rɪsk əˈsɛsmənt/', N'/rɪsk əˈsɛsmənt/', N'noun', N'Đánh giá rủi ro', N'A thorough risk assessment is essential before starting any project.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Damage control')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Damage control', N'/ˈdæmɪdʒ kənˈtrəʊl/', N'/ˈdæmɪdʒ kənˈtrəʊl/', N'noun', N'Kiểm soát thiệt hại', N'Damage control measures were implemented to reduce the impact of the crisis.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Recovery plan')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Recovery plan', N'/rɪˈkʌvəri plæn/', N'/rɪˈkʌvəri plæn/', N'noun', N'Kế hoạch phục hồi', N'The company has a well-prepared recovery plan to return to normal operations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Risk mitigation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Risk mitigation', N'/rɪsk ˌmɪtɪˈɡeɪʃən/', N'/rɪsk ˌmɪtɪˈɡeɪʃən/', N'noun', N'Giảm thiểu rủi ro', N'Risk mitigation strategies are designed to reduce the likelihood of incidents.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Incident response')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Incident response', N'/ˈɪnsɪdənt rɪˈspɒns/', N'/ˈɪnsɪdənt rɪˈspɒns/', N'noun', N'Phản ứng sự cố', N'The incident response team quickly isolated the affected area.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Vulnerability')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Vulnerability', N'/ˌvʌlnərəˈbɪləti/', N'/ˌvʌlnərəˈbɪləti/', N'noun', N'Sự dễ bị tổn thương', N'The company’s vulnerability to cyberattacks was identified during the risk audit.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Disaster recovery')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Disaster recovery', N'/dɪˈzɑːstər rɪˈkʌvəri/', N'/dɪˈzɑːstər rɪˈkʌvəri/', N'noun', N'Phục hồi sau thảm họa', N'Disaster recovery planning helps businesses resume operations quickly after a crisis.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Business continuity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Business continuity', N'/ˈbɪznɪs kənˈtɪnjudʒɪti/', N'/ˈbɪznɪs kənˈtɪnjudʒɪti/', N'noun', N'Liên tục kinh doanh', N'Business continuity ensures that critical operations continue during a crisis.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Risk analysis')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Risk analysis', N'/rɪsk əˈnæləsɪs/', N'/rɪsk əˈnæləsɪs/', N'noun', N'Phân tích rủi ro', N'The risk analysis showed a high likelihood of delays in the supply chain.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Contingency fund')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Contingency fund', N'/kənˈtɪndʒənsi fʌnd/', N'/kənˈtɪndʒənsi fʌnd/', N'noun', N'Quỹ dự phòng', N'A contingency fund was set up to cover unexpected expenses during the crisis.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Stress test')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Stress test', N'/ˈstrɛs tɛst/', N'/ˈstrɛs tɛst/', N'noun', N'Kiểm tra căng thẳng', N'The company performed a stress test to evaluate how its systems would handle a disaster.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Emergency procedures')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Emergency procedures', N'/ɪˈmɜːdʒənsi prəˈsɛdʊr/', N'/ɪˈmɜːdʒənsi prəˈsɛdʊr/', N'noun', N'Quy trình khẩn cấp', N'Employees must be familiar with emergency procedures to respond effectively.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Crisis communication')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Crisis communication', N'/ˈkraɪsɪs kəˌmjunɪˈkeɪʃən/', N'/ˈkraɪsɪs kəˌmjunɪˈkeɪʃən/', N'noun', N'Giao tiếp trong khủng hoảng', N'Crisis communication is key to maintaining transparency during difficult times.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Risk avoidance')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Risk avoidance', N'/rɪsk əˈvɔɪdəns/', N'/rɪsk əˈvɔɪdəns/', N'noun', N'Tránh rủi ro', N'The company employs risk avoidance strategies to prevent potential threats.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Business impact analysis')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Business impact analysis', N'/ˈbɪznɪs ˈɪmpækt əˈnæləsɪs/', N'/ˈbɪznɪs ˈɪmpækt əˈnæləsɪs/', N'noun', N'Phân tích tác động kinh doanh', N'A business impact analysis helps identify the critical functions that must be preserved.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Liability')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Liability', N'/ˌlaɪəˈbɪləti/', N'/ˌlaɪəˈbɪləti/', N'noun', N'Trách nhiệm pháp lý', N'The company’s liability for damages during the crisis was evaluated by its legal team.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Recovery time objective')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Recovery time objective', N'/rɪˈkʌvəri taɪm əbˈdʒɛktɪv/', N'/rɪˈkʌvəri taɪm əbˈdʒɛktɪv/', N'adjective', N'Mục tiêu thời gian phục hồi', N'The recovery time objective was set to 48 hours to restore operations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Prevention')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Prevention', N'/prɪˈvɛnʃən/', N'/prɪˈvɛnʃən/', N'noun', N'Ngăn ngừa', N'Prevention of risks is always the best approach to crisis management.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Root cause analysis')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Root cause analysis', N'/ruːt kɔːz əˈnæləsɪs/', N'/ruːt kɔːz əˈnæləsɪs/', N'noun', N'Phân tích nguyên nhân gốc rễ', N'After the crisis, a root cause analysis was conducted to understand what went wrong.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Contingency strategy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Contingency strategy', N'/kənˈtɪndʒənsi ˈstrætədʒi/', N'/kənˈtɪndʒənsi ˈstrætədʒi/', N'noun', N'Chiến lược dự phòng', N'A solid contingency strategy was developed to address future risks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Risk register')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Risk register', N'/rɪsk ˈrɛdʒɪstər/', N'/rɪsk ˈrɛdʒɪstər/', N'noun', N'Sổ đăng ký rủi ro', N'The risk register tracks potential risks and their mitigation measures.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_48 AND Word = N'Crisis team')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_48, N'Crisis team', N'/ˈkraɪsɪs tiːm/', N'/ˈkraɪsɪs tiːm/', N'noun', N'Đội xử lý khủng hoảng', N'The crisis team was assembled to manage the company’s response to the emergency.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_48 AND Prompt = N'Từ "Root cause analysis" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_48, N'Từ "Root cause analysis" có nghĩa là gì?', NULL, N'["Mục tiêu thời gian phục hồi", "Ngăn ngừa", "Giảm thiểu rủi ro", "Phân tích nguyên nhân gốc rễ"]', 3);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_48 AND Prompt = N'Từ "Contingency fund" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_48, N'Từ "Contingency fund" có nghĩa là gì?', NULL, N'["Kế hoạch dự phòng", "Phản ứng khẩn cấp", "Quỹ dự phòng", "Quy trình khẩn cấp"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_48 AND Prompt = N'Từ "Crisis communication" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_48, N'Từ "Crisis communication" có nghĩa là gì?', NULL, N'["Phục hồi sau thảm họa", "Kiểm soát thiệt hại", "Giao tiếp trong khủng hoảng", "Sự dễ bị tổn thương"]', 2);

-- Chủ đề 49: Đàm phán (Negotiations) (29 từ)
DECLARE @LessonId_49 INT;
SELECT @LessonId_49 = Id FROM dbo.Lessons WHERE Title = N'Đàm phán (Negotiations)' AND LanguageCode = 'en';
IF @LessonId_49 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Đàm phán (Negotiations)', 'en', 'TOEIC 800', 51, 3, 3);
    SET @LessonId_49 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Negotiation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Negotiation', N'/nɪˌɡəʊʃɪˈeɪʃən/', N'/nɪˌɡəʊʃɪˈeɪʃən/', N'noun', N'Đàm phán', N'The negotiation lasted for hours before both parties reached an agreement.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Agreement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Agreement', N'/əˈɡriːmənt/', N'/əˈɡriːmənt/', N'noun', N'Thỏa thuận', N'We signed a formal agreement after the negotiation process.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Bargaining')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Bargaining', N'/ˈbɑːɡɪnɪŋ/', N'/ˈbɑːɡɪnɪŋ/', N'noun', N'Mặc cả', N'The bargaining took longer than expected, but we finally agreed on a price.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Terms')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Terms', N'/tɜːmz/', N'/tɜːmz/', N'noun', N'Điều khoản', N'The terms of the contract were negotiated over several meetings.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Counteroffer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Counteroffer', N'/ˈkaʊntərɒfə(r)/', N'/ˈkaʊntərɒfə(r)/', N'noun', N'Đề nghị phản đối, phản biện', N'The company made a counteroffer to the initial price.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Compromise')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Compromise', N'/ˈkɒmprəmaɪz/', N'/ˈkɒmprəmaɪz/', N'verb', N'Thỏa hiệp', N'Both sides reached a compromise to close the deal.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Mediation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Mediation', N'/ˌmiːdɪˈeɪʃən/', N'/ˌmiːdɪˈeɪʃən/', N'noun', N'Hòa giải', N'The parties hired a third party for mediation to resolve the dispute.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Negotiator')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Negotiator', N'/nɪˈɡəʊʃɪeɪtə(r)/', N'/nɪˈɡəʊʃɪeɪtə(r)/', N'noun', N'Người đàm phán', N'The negotiator played a crucial role in facilitating the discussions.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Proposal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Proposal', N'/prəˈpəʊzl/', N'/prəˈpəʊzl/', N'adjective', N'Đề xuất', N'The company submitted a proposal to the client for review.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Win-win situation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Win-win situation', N'/wɪn wɪn ˌsɪtʃʊˈeɪʃən/', N'/wɪn wɪn ˌsɪtʃʊˈeɪʃən/', N'noun', N'Tình huống đôi bên cùng có lợi', N'We aim to create a win-win situation where both parties benefit.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Agreement in principle')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Agreement in principle', N'/əˈɡriːmənt ɪn ˈprɪnsəpl/', N'/əˈɡriːmənt ɪn ˈprɪnsəpl/', N'noun', N'Thỏa thuận nguyên tắc', N'The two companies have reached an agreement in principle on the deal.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Concession')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Concession', N'/kənˈsɛʃən/', N'/kənˈsɛʃən/', N'noun', N'Nhượng bộ', N'After lengthy discussions, the company made a concession on the price.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Terms of reference')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Terms of reference', N'/ˈtɜːmz əv rɪˈfɛrəns/', N'/ˈtɜːmz əv rɪˈfɛrəns/', N'noun', N'Các điều khoản tham chiếu', N'The terms of reference were agreed upon before starting the project.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Facilitator')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Facilitator', N'/fəˈsɪlɪteɪtə(r)/', N'/fəˈsɪlɪteɪtə(r)/', N'noun', N'Người tạo điều kiện, người điều phối', N'The facilitator helped guide the conversation and ensured everyone’s input was heard.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Deal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Deal', N'/diːl/', N'/diːl/', N'adjective', N'Thỏa thuận, giao dịch', N'They shook hands and closed the deal after several rounds of talks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Trade-off')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Trade-off', N'/ˈtreɪd ɒf/', N'/ˈtreɪd ɒf/', N'noun', N'Sự đánh đổi', N'Trade-offs are necessary when negotiating between competing interests.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Dealbreaker')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Dealbreaker', N'/ˈdiːlˌbreɪkər/', N'/ˈdiːlˌbreɪkər/', N'noun', N'Điều kiện không thể thương lượng', N'The contract’s payment terms were a dealbreaker for the supplier.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Terms and conditions')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Terms and conditions', N'/tɜːmz ənd kənˈdɪʃənz/', N'/tɜːmz ənd kənˈdɪʃənz/', N'noun', N'Điều khoản và điều kiện', N'The terms and conditions of the agreement must be reviewed by both parties.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Conclude')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Conclude', N'/kənˈkluːd/', N'/kənˈkluːd/', N'noun', N'Kết thúc, chấm dứt', N'The meeting will conclude after both parties sign the contract.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Win-lose situation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Win-lose situation', N'/wɪn luːz ˌsɪtʃʊˈeɪʃən/', N'/wɪn luːz ˌsɪtʃʊˈeɪʃən/', N'noun', N'Tình huống một bên thắng, một bên thua', N'The deal ended in a win-lose situation, with one party dissatisfied.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Leverage')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Leverage', N'/ˈlɛvərɪdʒ/', N'/ˈlɛvərɪdʒ/', N'noun', N'Sức ảnh hưởng', N'The company used its leverage to secure a better deal on the price.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Negotiating position')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Negotiating position', N'/nɪˈɡəʊʃieɪtɪŋ pəˈzɪʃən/', N'/nɪˈɡəʊʃieɪtɪŋ pəˈzɪʃən/', N'noun', N'Vị trí đàm phán', N'The two sides took opposite negotiating positions during the talks.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Closing the deal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Closing the deal', N'/ˈkləʊzɪŋ ðə diːl/', N'/ˈkləʊzɪŋ ðə diːl/', N'adjective', N'Chốt hợp đồng', N'After several weeks of negotiation, we are ready to close the deal.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Counterproposal')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Counterproposal', N'/ˈkaʊntərprəˈpəʊzl/', N'/ˈkaʊntərprəˈpəʊzl/', N'adjective', N'Đề nghị phản đối', N'The supplier made a counterproposal to our initial offer.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Competing interests')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Competing interests', N'/kəmˈpiːtɪŋ ˈɪntrəsts/', N'/kəmˈpiːtɪŋ ˈɪntrəsts/', N'noun', N'Lợi ích mâu thuẫn', N'The competing interests between the two companies caused delays in negotiations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Terms of agreement')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Terms of agreement', N'/tɜːmz əv əˈɡriːmənt/', N'/tɜːmz əv əˈɡriːmənt/', N'noun', N'Các điều khoản của thỏa thuận', N'Both parties agreed on the terms of agreement after much negotiation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Mutual benefit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Mutual benefit', N'/ˈmjuːtʃuəl ˈbɛnɪfɪt/', N'/ˈmjuːtʃuəl ˈbɛnɪfɪt/', N'noun', N'Lợi ích chung', N'The agreement was structured to ensure mutual benefit for both sides.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Mediate')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Mediate', N'/ˈmiːdieɪt/', N'/ˈmiːdieɪt/', N'verb', N'Hòa giải, trung gian', N'The mediator was brought in to mediate between the two parties.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_49 AND Word = N'Final offer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_49, N'Final offer', N'/ˈfaɪnəl ˈɒfə(r)/', N'/ˈfaɪnəl ˈɒfə(r)/', N'noun', N'Đề nghị cuối cùng', N'The company made its final offer to close the deal.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_49 AND Prompt = N'Từ "Counteroffer" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_49, N'Từ "Counteroffer" có nghĩa là gì?', NULL, N'["Đề nghị phản đối", "Đề nghị phản đối, phản biện", "Đề nghị cuối cùng", "Lợi ích mâu thuẫn"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_49 AND Prompt = N'Từ "Agreement" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_49, N'Từ "Agreement" có nghĩa là gì?', NULL, N'["Thỏa thuận", "Thỏa hiệp", "Nhượng bộ", "Người đàm phán"]', 0);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_49 AND Prompt = N'Từ "Terms" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_49, N'Từ "Terms" có nghĩa là gì?', NULL, N'["Thỏa thuận, giao dịch", "Điều kiện không thể thương lượng", "Đề xuất", "Điều khoản"]', 3);

-- Chủ đề 50: Hoạt động từ thiện (Charity & Non-profit) (28 từ)
DECLARE @LessonId_50 INT;
SELECT @LessonId_50 = Id FROM dbo.Lessons WHERE Title = N'Hoạt động từ thiện (Charity & Non-profit)' AND LanguageCode = 'en';
IF @LessonId_50 IS NULL
BEGIN
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'Hoạt động từ thiện (Charity & Non-profit)', 'en', 'TOEIC 800', 52, 3, 3);
    SET @LessonId_50 = SCOPE_IDENTITY();
END
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Charity')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Charity', N'/ˈtʃærəti/', N'/ˈtʃærəti/', N'noun', N'Từ thiện', N'The organization provides charity to those in need.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Donation')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Donation', N'/dəʊˈneɪʃən/', N'/dəʊˈneɪʃən/', N'noun', N'Sự quyên góp', N'The company made a donation to the local food bank.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Volunteer')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Volunteer', N'/ˌvɒlənˈtɪə(r)/', N'/ˌvɒlənˈtɪə(r)/', N'noun', N'Tình nguyện viên', N'She works as a volunteer at the animal shelter every weekend.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Fundraising')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Fundraising', N'/ˈfʌndˌreɪzɪŋ/', N'/ˈfʌndˌreɪzɪŋ/', N'noun', N'Gây quỹ', N'The event was a fundraising campaign for cancer research.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Non-profit')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Non-profit', N'/ˌnɒnˈprɒfɪt/', N'/ˌnɒnˈprɒfɪt/', N'noun', N'Phi lợi nhuận', N'The non-profit organization aims to support local communities.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Beneficiary')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Beneficiary', N'/ˌbenɪˈfɪʃəri/', N'/ˌbenɪˈfɪʃəri/', N'noun', N'Người hưởng lợi, đối tượng thụ hưởng', N'The beneficiaries of the program include low-income families.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Cause')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Cause', N'/kɔːz/', N'/kɔːz/', N'noun', N'Nguyên nhân, lý do', N'The organization supports the cause of environmental conservation.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Community service')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Community service', N'/kəˈmjunəti ˈsɜːvɪs/', N'/kəˈmjunəti ˈsɜːvɪs/', N'noun', N'Dịch vụ cộng đồng', N'Many high school students are required to complete community service hours.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Philanthropy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Philanthropy', N'/fɪˈlænθrəpi/', N'/fɪˈlænθrəpi/', N'noun', N'Lòng bác ái, hoạt động từ thiện', N'The billionaire is known for his philanthropy in healthcare and education.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Social responsibility')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Social responsibility', N'/ˈsəʊʃəl rɪˌspɒnsəˈbɪləti/', N'/ˈsəʊʃəl rɪˌspɒnsəˈbɪləti/', N'noun', N'Trách nhiệm xã hội', N'Social responsibility encourages businesses to contribute to the welfare of society.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Grant')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Grant', N'/ɡrænt/', N'/ɡrænt/', N'noun', N'Khoản tài trợ', N'The foundation received a grant to fund their research project.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Impact')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Impact', N'/ˈɪmpækt/', N'/ˈɪmpækt/', N'noun', N'Tác động, ảnh hưởng', N'The charity aims to make a positive impact on the community.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Outreach')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Outreach', N'/ˈaʊtˌriːtʃ/', N'/ˈaʊtˌriːtʃ/', N'noun', N'Tiếp cận', N'The organization conducts outreach programs to raise awareness of mental health.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Sponsorship')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Sponsorship', N'/ˈspɒnsəʃɪp/', N'/ˈspɒnsəʃɪp/', N'noun', N'Sự tài trợ', N'The event was made possible through sponsorship from several companies.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Benefactor')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Benefactor', N'/ˈbenɪfæktə(r)/', N'/ˈbenɪfæktə(r)/', N'noun', N'Nhà hảo tâm, người tài trợ', N'The benefactor generously funded the new school building.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Voluntary')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Voluntary', N'/ˈvɒləntri/', N'/ˈvɒləntri/', N'noun', N'Tình nguyện, tự nguyện', N'He gave voluntary time to help with the community cleanup.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Advocacy')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Advocacy', N'/ˈædvəkəsi/', N'/ˈædvəkəsi/', N'noun', N'Sự ủng hộ, vận động', N'The group works in advocacy to fight for animal rights.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Relief')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Relief', N'/rɪˈliːf/', N'/rɪˈliːf/', N'noun', N'Giảm nhẹ, cứu trợ', N'The charity provided relief to victims of the natural disaster.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Humanitarian')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Humanitarian', N'/hjuːˌmænɪˈteəriən/', N'/hjuːˌmænɪˈteəriən/', N'noun', N'Nhân đạo, nhân ái', N'The humanitarian organization helps refugees find shelter and food.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Empowerment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Empowerment', N'/ɪmˈpaʊə(r)mənt/', N'/ɪmˈpaʊə(r)mənt/', N'noun', N'Trao quyền', N'The program promotes empowerment through education and resources.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Fundraiser')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Fundraiser', N'/ˈfʌndˌreɪzər/', N'/ˈfʌndˌreɪzər/', N'noun', N'Người gây quỹ, sự kiện gây quỹ', N'The charity is hosting a fundraiser to support cancer research.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Charitable')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Charitable', N'/ˈtʃærɪtəbl/', N'/ˈtʃærɪtəbl/', N'adjective', N'Từ thiện, hảo tâm', N'He made a charitable donation to support disaster relief efforts.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Social welfare')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Social welfare', N'/ˈsəʊʃəl ˈwɛlfɛə(r)/', N'/ˈsəʊʃəl ˈwɛlfɛə(r)/', N'noun', N'Phúc lợi xã hội', N'The government provides social welfare programs to assist low-income families.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Endowment')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Endowment', N'/ɪnˈdaʊmənt/', N'/ɪnˈdaʊmənt/', N'noun', N'Quỹ tài trợ', N'The university received a large endowment to fund scholarships.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Human rights')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Human rights', N'/ˈhjuːmən raɪts/', N'/ˈhjuːmən raɪts/', N'noun', N'Quyền con người', N'The organization fights for human rights across the globe.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Corporate social responsibility')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Corporate social responsibility', N'/ˌkɔːpərət ˈsəʊʃəl rɪˌspɒnsəˈbɪləti/', N'/ˌkɔːpərət ˈsəʊʃəl rɪˌspɒnsəˈbɪləti/', N'noun', N'Trách nhiệm xã hội của doanh nghiệp', N'Companies often engage in corporate social responsibility to give back to communities.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Volunteerism')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Volunteerism', N'/ˌvɒlənˈtɪərɪzəm/', N'/ˌvɒlənˈtɪərɪzəm/', N'noun', N'Tinh thần tình nguyện', N'The event was organized through volunteerism and donations.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.Vocabularies WHERE LessonId = @LessonId_50 AND Word = N'Charity event')
    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, SpriteKey)
    VALUES (@LessonId_50, N'Charity event', N'/ˈtʃærɪti ɪˈvent/', N'/ˈtʃærɪti ɪˈvent/', N'noun', N'Sự kiện từ thiện', N'The charity event raised over $50,000 for medical research.', NULL);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_50 AND Prompt = N'Từ "Human rights" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_50, N'Từ "Human rights" có nghĩa là gì?', NULL, N'["Nhà hảo tâm, người tài trợ", "Quyền con người", "Tình nguyện viên", "Tinh thần tình nguyện"]', 1);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_50 AND Prompt = N'Từ "Social responsibility" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_50, N'Từ "Social responsibility" có nghĩa là gì?', NULL, N'["Tình nguyện viên", "Quỹ tài trợ", "Trách nhiệm xã hội", "Sự kiện từ thiện"]', 2);
IF NOT EXISTS (SELECT 1 FROM dbo.QuizQuestions WHERE LessonId = @LessonId_50 AND Prompt = N'Từ "Voluntary" có nghĩa là gì?')
    INSERT INTO dbo.QuizQuestions (LessonId, Prompt, SpriteKey, OptionsJson, CorrectOptionIndex)
    VALUES (@LessonId_50, N'Từ "Voluntary" có nghĩa là gì?', NULL, N'["Gây quỹ", "Tiếp cận", "Tình nguyện, tự nguyện", "Trách nhiệm xã hội"]', 2);

PRINT N'Hoàn tất nạp dữ liệu TOEIC thành công!';
GO