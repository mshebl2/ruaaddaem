<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" dir="rtl" lang="ar">
      <head>
        <title>خريطة الموقع - رواد الرقمية</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: 'Tajawal', Arial, sans-serif;
            font-size: 14px;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
            direction: rtl;
          }
          
          .header {
            background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }
          
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
          }
          
          .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          
          .stats {
            background: #f1f5f9;
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-around;
            text-align: center;
          }
          
          .stat {
            flex: 1;
          }
          
          .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #dc2743;
            display: block;
          }
          
          .stat-label {
            color: #64748b;
            font-size: 12px;
            margin-top: 5px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
          }
          
          th {
            background: #f8fafc;
            color: #374151;
            font-weight: bold;
            padding: 15px;
            text-align: right;
            border-bottom: 2px solid #e5e7eb;
            font-size: 14px;
          }
          
          td {
            padding: 12px 15px;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: top;
          }
          
          tr:hover {
            background-color: #f8fafc;
          }
          
          .url {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          
          .url:hover {
            color: #dc2743;
            text-decoration: underline;
          }
          
          .priority {
            font-weight: bold;
            padding: 4px 8px;
            border-radius: 4px;
            color: white;
            font-size: 12px;
            text-align: center;
          }
          
          .priority-high {
            background: #dc2626;
          }
          
          .priority-medium {
            background: #f59e0b;
          }
          
          .priority-low {
            background: #10b981;
          }
          
          .changefreq {
            background: #e0e7ff;
            color: #3730a3;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
          
          .lastmod {
            color: #6b7280;
            font-size: 13px;
          }
          
          .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            background: #f8fafc;
            border-top: 1px solid #e5e7eb;
          }
          
          .footer a {
            color: #dc2743;
            text-decoration: none;
          }
          
          .footer a:hover {
            text-decoration: underline;
          }
          
          @media (max-width: 768px) {
            body {
              padding: 10px;
            }
            
            .header h1 {
              font-size: 22px;
            }
            
            .stats {
              flex-direction: column;
              gap: 15px;
            }
            
            table {
              font-size: 12px;
            }
            
            th, td {
              padding: 8px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🗺️ خريطة الموقع</h1>
          <p>رواد الرقمية - خدمات دعم وتنشيط حسابات الإنستقرام والتيكتوك</p>
        </div>
        
        <div class="container">
          <div class="stats">
            <div class="stat">
              <span class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
              <div class="stat-label">إجمالي الصفحات</div>
            </div>
            <div class="stat">
              <span class="stat-number">XML</span>
              <div class="stat-label">تنسيق الملف</div>
            </div>
            <div class="stat">
              <span class="stat-number">UTF-8</span>
              <div class="stat-label">ترميز النص</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>رابط الصفحة</th>
                <th>آخر تحديث</th>
                <th>تكرار التحديث</th>
                <th>الأولوية</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}" class="url">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td class="lastmod">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                  <td>
                    <span class="changefreq">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </span>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sitemap:priority > 0.8">
                        <span class="priority priority-high">
                          <xsl:value-of select="sitemap:priority"/>
                        </span>
                      </xsl:when>
                      <xsl:when test="sitemap:priority > 0.6">
                        <span class="priority priority-medium">
                          <xsl:value-of select="sitemap:priority"/>
                        </span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority priority-low">
                          <xsl:value-of select="sitemap:priority"/>
                        </span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          
          <div class="footer">
            <p>
              تم إنشاء هذه الخريطة تلقائياً لموقع 
              <a href="https://astonishing-mochi-c0ccd3.netlify.app">رواد الرقمية</a>
            </p>
            <p>للتواصل: <a href="https://wa.me/962778623769">+962778623769</a></p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>