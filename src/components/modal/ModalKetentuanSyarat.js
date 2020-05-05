import React, { Component } from 'react';

import { Modal, Backdrop, Fade, Grid, FormControlLabel, Checkbox, Button } from '@material-ui/core';

export default class ModalKetentuanSyarat extends Component {
  state = {
    statusChecked: false
  }

  handleChecked = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          open={this.props.open}
          onClose={this.props.close}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.props.open}>
            <div style={{
              backgroundColor: 'white',
              boxShadow: 5,
              height: 550,
              width: 600,
              overflow: 'hidden',
              paddingBottom: 50,
              position: 'relative',
              padding: 30
            }}>
              <Grid style={{ overflow: 'scroll', height: 420, border: '0.3px solid black', padding: '10px 20px' }}>
                <p style={{ margin: '0px 0px 10px 0px', fontSize: 18, fontWeight: 'bold' }}>SYARAT DAN KETENTUAN PENGGUNAAN JASA ON LINE COACHING MEGAFIT</p>
                <p style={{ margin: '0px 0px 5px 0px' }}>Syarat dan ketentuan ini mengatur hubungan Pengguna Jasa (selanjutnya disebut Pengguna)  dengan PT. POLA MEGAFIT PRIMA (selanjutnya disebut MEGAFIT) dalam penggunaan jasa “On Line Coaching” (selanjutnya disebut OLC)</p>
                <p style={{ margin: '0px 0px 5px 0px' }}>
                  Persetujuan Pengguna untuk mematuhi dan terikat dengan syarat dan ketentuan ini dianggap terjadi pada saat Pengguna membeli jasa OLC.
                </p>
                <p style={{ margin: '0px 0px 10px 0px' }}>
                  Untuk menggunakan jasa OLC Pengguna harus berusia minimal 17 tahun.
                </p>
                <p style={{ margin: '0px 0px 5px 0px', fontWeight: 'bold' }}>
                  Medis
                </p>
                <ul style={{ paddingLeft: 20, marginTop: 5 }}>
                  <li>MEGAFIT  bukan praktisi medis. MEGAFIT sangat menyarankan bagi Pengguna yang memiliki kebutuhan khusus untuk melakukan konsultasi dengan praktisi medis sebelum memulai olahraga jenis apapun.</li>
                  <li>MEGAFIT tidak memiliki keahlian dalam mendiagnosa, memeriksa, atau mengobati kondisi medis dalam bentuk apa pun, atau menentukan efek dari setiap olahraga atau diet pada kondisi medis.</li>
                  <li>Pengguna mengakui bahwa ketika berpartisipasi dalam program latihan apa pun, ada kemungkinan cedera fisik.</li>
                </ul>

                <p style={{ margin: '0px 0px 5px 0px', fontWeight: 'bold' }}>
                  Data Pengguna
                </p>
                <ul style={{ paddingLeft: 20, marginTop: 5 }}>
                  <li>Pengguna harus memastikan bahwa informasi yang diberikan oleh Pengguna pada saat mendaftar sudah benar dan lengkap.</li>
                  <li>Pengguna harus segera memberi tahu MEGAFIT tentang perubahan informasi yang Pengguna berikan saat mendaftar dengan memperbarui data pribadi Pengguna untuk memastikan MEGAFIT dapat berkomunikasi dengan Pengguna secara efektif.</li>
                  <li>MEGAFIT dapat menangguhkan atau membatalkan layanan terhadap Pengguna  untuk alasan yang wajar atau jika Pengguna melanggar syarat dan ketentuan ini.</li>
                </ul>

                <p style={{ margin: '0px 0px 5px 0px', fontWeight: 'bold' }}>
                  Kebijakan Refund
                </p>
                <ul style={{ paddingLeft: 20, marginTop: 5 }}>
                  <li>MEGAFIT tidak memiliki kebijakan pengembalian dana pembelian layanan OLC.</li>
                </ul>

                <p style={{ margin: '0px 0px 5px 0px', fontWeight: 'bold' }}>
                  Batasan tanggung jawab
                </p>
                <ul style={{ paddingLeft: 20, marginTop: 5 }}>
                  <li>MEGAFIT tidak  bertanggung jawab kepada Pengguna sehubungan dengan kerugian yang timbul akibat kejadian di luar kendali MEGAFIT.</li>
                  <li>Sejauh yang diizinkan oleh hukum, MEGAFIT tidak bertanggung jawab atas hal berikut:</li>
                  <ul style={{ paddingLeft: 20, margin: 0 }}>
                    <li>kerugian Bisnis, seperti hilangnya keuntungan, pendapatan,  tabungan atau peluang komersial;</li>
                    <li>kehilangan atau rusaknya data, database atau perangkat lunak;</li>
                    <li>kerugian atau kerusakan yang bersifat khusus, tidak langsung, atau konsekuensial.</li>
                  </ul>
                  <li>MEGAFIT tidak memiliki kualifikasi untuk memberikan saran medis.</li>
                  <li>Setiap program latihan, bahkan pada individu yang sehat, memiliki risiko, Pengguna bertanggung jawab menilai kemampuan pribadi untuk jenis latihan  tertentu sebelum mengikuti layanan yang disediakan oleh MEGAFIT.</li>
                  <li>Program pribadi yang disediakan oleh MEGAFIT, tidak boleh dianggap sebagai program pemulihan kesehatan atau rehabilitasi. Dengan demikian setiap tindakan Pengguna dalam kaitannya dengan program pribadi harus mempertimbangkan  informasi, pendapat atau penilaian pihak yang mempunyai kompetensi dalam bidangnya.</li>
                  <li>Setiap program pribadi akan dipersiapkan berdasarkan informasi yang diberikan Pengguna. Pengguna bertanggung jawab atas keakuratan informasi yang diberikan Pengguna  kepada MEGAFIT. Pengguna bertanggung jawab untuk memberitahukan MEGAFIT tentang masalah kesehatan atau kondisi medis ketika meminta MEGAFIT untuk menyiapkan program pribadi.</li>
                  <li>Informasi yang terdapat dalam program pribadi dapat berhubungan dengan konteks tertentu dan mungkin tidak cocok dengan konteks lain. Adalah tanggung jawab Pengguna untuk memastikan bahwa Pengguna tidak menggunakan informasi yang disediakan MEGAFIT dalam konteks yang salah.</li>
                  <li>Setiap informasi yang disediakan MEGAFIT  yang tidak merupakan bagian dari program pribadi, apakah diperoleh melalui website MEGAFIT, video, media sosial (seperti Facebook atau Instagram)  disediakan untuk tujuan informasi umum saja.</li>
                </ul>

                <p style={{ margin: '0px 0px 5px 0px', fontWeight: 'bold' }}>
                  Hasil yang diharapkan
                </p>
                <ul style={{ paddingLeft: 20, marginTop: 5 }}>
                  <li>Meskipun MEGAFIT percaya bahwa bagi kebanyakan orang, mengikuti program dan metode MEGAFIT akan mengarah pada hasil yang diinginkan, semua program latihan tergantung pada individu. Hasil akan terpengaruh oleh upaya dan komitmen individu, namun dalam beberapa keadaan bahkan di mana seorang individu mengikuti program MEGAFIT, mereka mungkin tidak mencapai hasil yang diinginkan. Karena itu MEGAFIT tidak memberikan jaminan apapun, baik tersurat maupun tersirat, untuk:</li>
                  <ol style={{ paddingLeft: 20, marginTop: 5 }}>
                    <li>efektivitas setiap teknik, diet atau program yang MEGAFIT sampaikan; atau</li>
                    <li>hasil yang mungkin Pengguna capai sebagai hasil dari mengikuti program MEGAFIT.</li>
                  </ol>
                </ul>

                <p style={{ margin: '0px 0px 5px 0px', fontWeight: 'bold' }}>
                Umum
                </p>
                <ul style={{ paddingLeft: 20, marginTop: 5 }}>
                  <li>Berdasarkan syarat dan ketentuan ini Pengguna tidak boleh mengalihkan hak Pengguna  kepada orang lain. MEGAFIT dapat mengalihkan hak MEGAFIT berdasarkan syarat dan ketentuan ini yang secara wajar MEGAFIT yakini tidak akan berpengaruh pada hak Pengguna.</li>
                  <li>MEGAFIT dapat merubah syarat dan ketentuan ini tanpa pemberitahuan terlebih dahulu. Perubahan syarat dan ketentuan tersebut akan berlaku sejak tanggal publikasi. Pengguna harus memeriksa syarat dan ketentuan secara teratur untuk memastikan mengetahui versi yang berlaku.</li>
                  <li>Jika ada otoritas pengadilan atau pihak yang berkompeten menemukan ada  ketentuan dari syarat dan ketentuan (atau bagian dari ketentuan) tidak sah, ilegal atau tidak dapat diberlakukan, maka ketentuan atau bagian-ketentuan, sejauh yang diperlukan, akan dihapus, dan validitas dan keberlakuan ketentuan lain dari syarat dan ketentuan ini tetap berlaku.</li>
                  <li>Pengguna  wajib hadir selambat-lambatnya 15 menit dari jadwal yang sudah ditentukan, jika tidak hadir maka sesi dianggap sudah dipakai. Jadwal sesi dapat dirubah selambat-lambatnya 24 jam sebelumnya, ke jadwal yang tersedia. </li>
                </ul>
              </Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.statusChecked}
                    onChange={this.handleChecked('statusChecked')}
                    name="statusChecked"
                    color="primary"
                  />
                }
                label="saya sudah baca & setuju terhadap semua syarat & ketentuan"
              />
              <Grid style={{ display: 'flex', justifyContent: 'end' }}>
                <Button style={{ backgroundColor: '#d8d8d8', width: 80 }} disabled={!this.state.statusChecked} onClick={this.props.next}>
                  Lanjut
                </Button>
              </Grid>
            </div>
          </Fade>
        </Modal>
      </>
    )
  }
}
