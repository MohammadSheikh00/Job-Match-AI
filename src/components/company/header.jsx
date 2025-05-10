import React from 'react';

const CompanyHeader = () => {

  const handleLogout = () => {
    // هنا يمكنك إضافة أي خطوة تخص تسجيل الخروج مثل مسح البيانات المخزنة في الجلسة أو ملفات تعريف الارتباط
    // على سبيل المثال، مسح الجلسة:
    sessionStorage.clear(); // أو localStorage.clear(); حسب استخدامك

    // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
    window.location.href = '/homepage'; // يقوم بإعادة توجيه الصفحة إلى صفحة تسجيل الدخول
  };

  return (
    <header
      className="px-4 py-3 d-flex justify-content-between align-items-center border-bottom"
      style={{
        background: 'linear-gradient(135deg , rgb(32, 58, 67), rgb(44, 83, 100),rgb(15, 32, 39))',
      }}
    >
      <h5 className="m-0 text-white">Company Dashboard</h5>
      <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default CompanyHeader;
